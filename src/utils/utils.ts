import { Contract, ethers } from 'ethers'
import { API } from '../api'
import {
  farmDecimals,
  vaultsWithoutReward,
  farmAddress,
  outdatedVaults,
  outdatedPools,
} from '../constants/constants'
import {
  FTOKEN_ABI,
  REWARDS_ABI,
  ERC20_ABI_GET_PRICE_PER_FULL_SHARE,
  PS_VAULT_ABI,
} from '../lib/data/ABIs'
import { IAssetsInfo, IPool, IVault } from '../types'

const currencyFormatter = (currency: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  })

export const prettyBalance = (balance: number, currency: string) => {
  return currencyFormatter(currency).format(balance)
}

export const convertStandardNumber = (num: number, currency: string) => {
  return num ? currencyFormatter(currency).format(num) : '$0.00'
}

// Case 1: Vault has pool: 1.1 pool has Farm reward, 1.2 pool has iFarm reward
// Case 2: Vault has no pool.
// Case 3: Pool without Vault.
// Case 4: Vault it is iFarm.
// Case 5: Vault it is PS.
export const getAssets = async (
  walletAddress: string,
  provider:
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc,
): Promise<IAssetsInfo[]> => {
  const ethersProvider = new ethers.providers.Web3Provider(provider)

  // get all pools and vaults
  const [pools, vaults] = await Promise.all<IPool[], IVault[]>([
    API.getPools(),
    API.getVaults(),
  ])

  const actualVaults = vaults.filter((v) => {
    return !outdatedVaults.has(v.contract.address)
  })

  const actualPools = pools.filter((p) => {
    return !outdatedPools.has(p.contract.address)
  })

  const getAssetsFromPool = async (
    pool: IPool,
    relatedVault?: IVault,
  ): Promise<IAssetsInfo> => {
    const lpTokenContract = new Contract(
      pool.lpToken.address,
      FTOKEN_ABI,
      ethersProvider,
    )

    const poolAddress = pool.contract.address
    const poolContract = new Contract(poolAddress, REWARDS_ABI, ethersProvider)
    // Pool where reward is iFarm
    const iFarmRewardPool = new Contract(
      pool.rewardToken.address,
      ERC20_ABI_GET_PRICE_PER_FULL_SHARE,
      ethersProvider,
    )
    const rewardIsFarm = pool.rewardToken.address.toLowerCase() === farmAddress

    /**
     * lpTokenBalance - balance of a wallet in the liquidity-pool
     * poolBalance - balance of a wallet in the pool (are in fToken)
     * underlyingPrice - the price are in USD
     * rewardTokenPrice - the price are in USD (for FARM or iFARM)
     * reward - reward of a wallet in the pool
     * poolTotalSupply - the total number of tokens in the pool of all participants
     * rewardPricePerFullShare = (iFARMPrice / farmPrice) * 10 ** rewardDecimals
     * pricePerFullShareLpToken = (nativeToken / fToken ) * 10 ** lpTokenDecimals
     */
    const [
      lpTokenBalance,
      poolBalance,
      underlyingPrice,
      rewardTokenPrice,
      reward,
      poolTotalSupply,
      rewardPricePerFullShare,
      pricePerFullShareLpToken,
      lpTokenDecimals,
    ] = await Promise.all([
      lpTokenContract.balanceOf(walletAddress),
      poolContract.balanceOf(walletAddress),
      API.getTokenPrice(
        relatedVault ? relatedVault.underlying.address : pool.lpToken.address,
      ),
      API.getTokenPrice(pool.rewardToken.address),
      poolContract.earned(walletAddress),
      poolContract.totalSupply(),
      rewardIsFarm ? null : iFarmRewardPool.getPricePerFullShare(),
      relatedVault ? lpTokenContract.getPricePerFullShare() : null,
      relatedVault ? relatedVault.decimals : lpTokenContract.decimals(),
    ])

    const lpTokenBalanceIntNumber =
      parseInt(lpTokenBalance._hex, 16) / 10 ** lpTokenDecimals
    const poolBalanceIntNumber =
      parseInt(poolBalance._hex, 16) / 10 ** lpTokenDecimals

    const prettyPricePerFullShareLpToken = relatedVault
      ? parseInt(pricePerFullShareLpToken._hex, 16) / 10 ** lpTokenDecimals
      : 1

    const prettyRewardPricePerFullShare = rewardIsFarm
      ? 1
      : parseInt(rewardPricePerFullShare._hex, 16) / 10 ** farmDecimals

    const intRewardTokenBalance = parseInt(reward._hex, 16) / 10 ** farmDecimals

    const rewardTokenAreInFARM = rewardIsFarm
      ? intRewardTokenBalance
      : intRewardTokenBalance * prettyRewardPricePerFullShare

    const percentOfPool = (poolBalance * 100) / poolTotalSupply

    /** All account assets that contains in the pool are in USD */
    const calcValue = () => {
      return (
        underlyingPrice *
          poolBalanceIntNumber *
          prettyPricePerFullShareLpToken +
        rewardTokenPrice * rewardTokenAreInFARM
      )
    }

    // fTokens balance in underlying Tokens;
    const underlyingBalance =
      poolBalanceIntNumber * prettyPricePerFullShareLpToken

    return {
      name: relatedVault ? relatedVault.contract.name : pool.contract.name,
      earnFarm: true,
      farmToClaim: rewardTokenAreInFARM,
      stakedBalance: poolBalanceIntNumber,
      percentOfPool,
      value: calcValue(),
      unstakedBalance: lpTokenBalanceIntNumber,
      address: relatedVault
        ? relatedVault.contract.address
        : pool.contract.address,
      underlyingBalance,
    }
  }

  const getAssetsFromVaults = (): Promise<IAssetsInfo>[] => {
    return actualVaults.map(async (vault) => {
      // is this Vault iFarm?
      const isIFarm =
        vault.contract.address.toLowerCase() ===
        '0x1571eD0bed4D987fe2b498DdBaE7DFA19519F651'.toLowerCase()

      // a pool that has the same token as a vault
      const vaultRelatedPool = actualPools.find((pool) => {
        return (
          vault.contract.address.toLowerCase() ===
          pool.lpToken.address.toLowerCase()
        )
      })

      const vaultContract = new Contract(
        vault.contract.address,
        FTOKEN_ABI,
        ethersProvider,
      )

      if (vaultRelatedPool) {
        return getAssetsFromPool(vaultRelatedPool, vault)
      }
      if (isIFarm) {
        const farmContract = new Contract(
          vault.underlying.address,
          PS_VAULT_ABI,
          ethersProvider,
        )

        const [
          vaultBalance,
          farmBalance,
          farmPrice,
          totalSupply,
          underlyingBalanceWithInvestmentForHolder,
          pricePerFullShare,
        ] = await Promise.all([
          vaultContract.balanceOf(walletAddress),
          farmContract.balanceOf(walletAddress),
          API.getTokenPrice(vault.underlying.address),
          vaultContract.totalSupply(),
          vaultContract.underlyingBalanceWithInvestmentForHolder(walletAddress),
          vaultContract.getPricePerFullShare(),
        ])
        const prettyFarmBalance =
          parseInt(farmBalance._hex, 16) / 10 ** farmDecimals
        const prettyVaultBalance =
          parseInt(vaultBalance._hex, 16) / 10 ** vault.decimals
        const prettyUnderlyingBalanceWithInvestmentForHolder = parseInt(
          underlyingBalanceWithInvestmentForHolder._hex,
          16,
        )
        const prettyPricePerFullShare =
          parseInt(pricePerFullShare._hex, 16) / 10 ** vault.decimals
        const value =
          (prettyUnderlyingBalanceWithInvestmentForHolder * farmPrice) /
          10 ** vault.decimals

        const percentOfPool = (vaultBalance / totalSupply) * 100

        const underlyingBalance = prettyVaultBalance * prettyPricePerFullShare

        return {
          name: vault.contract.name,
          earnFarm: true,
          farmToClaim: 0,
          stakedBalance: prettyVaultBalance,
          percentOfPool,
          value,
          unstakedBalance: prettyFarmBalance,
          address: vault.contract.address,
          underlyingBalance,
        }
      }

      // PS vault
      if (
        vault.contract.address.toLowerCase() ===
        '0x25550cccbd68533fa04bfd3e3ac4d09f9e00fc50'
      ) {
        const farmContract = new Contract(
          farmAddress,
          PS_VAULT_ABI,
          ethersProvider,
        )
        const PSvaultContract = new Contract(
          vault.contract.address,
          PS_VAULT_ABI,
          ethersProvider,
        )
        const [vaultBalance, farmBalance] = await Promise.all([
          PSvaultContract.balanceOf(walletAddress),
          farmContract.balanceOf(walletAddress),
        ])
        const prettyVaultBalance =
          parseInt(vaultBalance._hex, 16) / 10 ** vault.decimals
        const prettyFarmBalance =
          parseInt(farmBalance._hex, 16) / 10 ** farmDecimals

        const percentOfPool = 0

        return {
          name: vault.contract.name,
          earnFarm: !vaultsWithoutReward.has(vault.contract.name),
          farmToClaim: 0,
          stakedBalance: prettyVaultBalance,
          percentOfPool,
          value: 0,
          unstakedBalance: prettyFarmBalance,
          address: vault.contract.address,
          underlyingBalance: prettyVaultBalance,
        }
      }

      const [vaultBalance, totalSupply] = await Promise.all([
        vaultContract.balanceOf(walletAddress),
        vaultContract.totalSupply(),
      ])
      const vaultBalanceIntNumber =
        parseInt(vaultBalance._hex, 16) / 10 ** vault.decimals
      const percentOfPool = totalSupply ? (vaultBalance / totalSupply) * 100 : 0

      return {
        name: vault.contract.name,
        earnFarm: !vaultsWithoutReward.has(vault.contract.name),
        farmToClaim: 0,
        stakedBalance: 0,
        percentOfPool,
        value: 0,
        unstakedBalance: vaultBalanceIntNumber,
        address: vault.contract.address,
        underlyingBalance: vaultBalanceIntNumber,
      }
    })
  }

  const assetsFromVaultsPromises = getAssetsFromVaults()

  const poolsWithoutVaults = actualPools.filter((pool) => {
    return !vaults.find(
      (vault) => vault.contract.address === pool.lpToken.address,
    )
  })

  const assetsFromPoolsWithoutVaultsPromises = poolsWithoutVaults.map((pool) =>
    getAssetsFromPool(pool),
  )

  const assetsDataResolved: IAssetsInfo[] = await Promise.all([
    ...assetsFromVaultsPromises,
    ...assetsFromPoolsWithoutVaultsPromises,
  ])
  const nonZeroAssets = assetsDataResolved.filter((asset) => {
    return (
      asset.farmToClaim ||
      asset.stakedBalance ||
      asset.value ||
      asset.unstakedBalance ||
      asset.underlyingBalance
    )
  })

  return nonZeroAssets
}

export const prettyEthAddress = (address: string) => {
  if (address && address.length === 42) {
    address = `${address.substring(0, 6)}...${address.substring(42, 38)}`
  }
  return address
}
