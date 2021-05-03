import { Contract, ethers, BigNumber } from 'ethers'
import Web3 from 'web3'
import { API } from '../api'
import {
  farmDecimals,
  vaultsWithoutReward,
  farmAddress,
  outdatedVaults,
  outdatedPools,
  bFarmAddress,
  BSC_URL,
  DEFAULT_BSC_ORACLE_CONTRACT_FOR_GETTING_PRICES,
  LEGACY_BSC_FACTORY,
  LEGACY_BSC_ORACLE_CONTRACT_FOR_GETTING_PRICES,
} from '../constants/constants'
import {
  FTOKEN_ABI,
  REWARDS_ABI,
  ERC20_ABI_GET_PRICE_PER_FULL_SHARE,
  PS_VAULT_ABI,
  BSC_UNDERLYING_ABI,
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
export const getEtheriumAssets = async (
  walletAddress: string,
  provider:
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc,
): Promise<IAssetsInfo[]> => {
  const ethersProvider = new ethers.providers.Web3Provider(provider)

  // get all pools and vaults
  const [pools, vaults, farmPrice] = await Promise.all<
    IPool[],
    IVault[],
    number
  >([
    API.getPools(),
    API.getVaults(),
    API.getEtheriumPrice(farmAddress, provider),
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

    const priceAddress = relatedVault
      ? relatedVault.underlying.address
      : pool.lpToken.address
    /**
     * lpTokenBalance - balance of a wallet in the liquidity-pool
     * rewardTokenPrice - the price are in USD (for FARM or iFARM)
     * reward - reward of a wallet in the pool
     * poolTotalSupply - the total number of tokens in the pool of all participants
     * pricePerFullShareLpToken = (nativeToken / fToken ) * 10 ** lpTokenDecimals
     */
    const [
      lpTokenBalance,
      poolBalance,
      reward,
      pricePerFullShareLpToken,
      lpTokenDecimals,
    ] = await Promise.all<
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber | null,
      number
    >([
      lpTokenContract.balanceOf(walletAddress),
      poolContract.balanceOf(walletAddress),
      poolContract.earned(walletAddress),
      relatedVault ? lpTokenContract.getPricePerFullShare() : null,
      relatedVault ? relatedVault.decimals : lpTokenContract.decimals(),
    ])
    const prettyLpTokenBalance =
      parseInt(lpTokenBalance._hex, 16) / 10 ** lpTokenDecimals
    const prettyPoolBalance =
      parseInt(poolBalance._hex, 16) / 10 ** lpTokenDecimals

    const prettyPricePerFullShareLpToken = pricePerFullShareLpToken
      ? parseInt(pricePerFullShareLpToken._hex, 16) / 10 ** lpTokenDecimals
      : 1

    const prettyRewardTokenBalance =
      parseInt(reward._hex, 16) / 10 ** farmDecimals
    /**
     * underlyingPrice - the price are in USD
     * iFarmPricePerFullShare = (iFARMPrice / farmPrice) * 10 ** rewardDecimals
     * poolBalance - balance of a wallet in the pool (are in fToken)
     */
    const [
      underlyingPrice,
      iFarmPricePerFullShare,
      poolTotalSupply,
    ] = await Promise.all<number, BigNumber | false | 0, BigNumber>([
      prettyPoolBalance ? API.getEtheriumPrice(priceAddress, provider) : 0,
      prettyRewardTokenBalance &&
        !rewardIsFarm &&
        iFarmRewardPool.getPricePerFullShare(),
      prettyPoolBalance ? poolContract.totalSupply() : 1,
    ])

    const prettyRewardPricePerFullShare = iFarmPricePerFullShare
      ? parseInt(iFarmPricePerFullShare._hex, 16) / 10 ** farmDecimals
      : 1

    const rewardTokenAreInFARM =
      prettyRewardTokenBalance * prettyRewardPricePerFullShare

    const percentOfPool = (poolBalance / poolTotalSupply) * 100

    /** All account assets that contains in the pool are in USD */
    const calcValue = () => {
      return (
        underlyingPrice * prettyPoolBalance * prettyPricePerFullShareLpToken +
        farmPrice * rewardTokenAreInFARM
      )
    }

    // fTokens balance in underlying Tokens;
    const underlyingBalance = prettyPoolBalance * prettyPricePerFullShareLpToken

    return {
      name: relatedVault ? relatedVault.contract.name : pool.contract.name,
      earnFarm: true,
      farmToClaim: rewardTokenAreInFARM,
      stakedBalance: prettyPoolBalance,
      percentOfPool,
      value: calcValue(),
      unstakedBalance: prettyLpTokenBalance,
      address: relatedVault
        ? relatedVault.contract.address
        : pool.contract.address,
      underlyingBalance,
    }
  }

  const getAssetsFromVaults = (): Promise<IAssetsInfo>[] => {
    return actualVaults.map(async (vault: IVault) => {
      // is this Vault iFarm?
      const isIFarm =
        vault.contract.address.toLowerCase() ===
        '0x1571eD0bed4D987fe2b498DdBaE7DFA19519F651'.toLowerCase()

      // is this Vault PS?
      const isPS =
        vault.contract.address.toLowerCase() ===
        '0x25550cccbd68533fa04bfd3e3ac4d09f9e00fc50'

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
          totalSupply,
          underlyingBalanceWithInvestmentForHolder,
          pricePerFullShare,
        ] = await Promise.all<
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber
        >([
          vaultContract.balanceOf(walletAddress),
          farmContract.balanceOf(walletAddress),
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

      if (isPS) {
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
        const [vaultBalance, farmBalance] = await Promise.all<
          BigNumber,
          BigNumber
        >([
          PSvaultContract.balanceOf(walletAddress),
          farmContract.balanceOf(walletAddress),
        ])
        const prettyVaultBalance =
          parseInt(vaultBalance._hex, 16) / 10 ** vault.decimals
        const prettyFarmBalance =
          parseInt(farmBalance._hex, 16) / 10 ** farmDecimals

        const percentOfPool = 0

        const value = prettyVaultBalance * farmPrice

        return {
          name: vault.contract.name,
          earnFarm: !vaultsWithoutReward.has(vault.contract.name),
          farmToClaim: 0,
          stakedBalance: prettyVaultBalance,
          percentOfPool,
          value,
          unstakedBalance: prettyFarmBalance,
          address: vault.contract.address,
          underlyingBalance: prettyVaultBalance,
        }
      }

      const vaultBalance: BigNumber = await vaultContract.balanceOf(
        walletAddress,
      )
      const prettyVaultBalance =
        parseInt(vaultBalance._hex, 16) / 10 ** vault.decimals

      const totalSupply = prettyVaultBalance
        ? await vaultContract.totalSupply()
        : 1

      const percentOfPool = totalSupply ? (vaultBalance / totalSupply) * 100 : 0

      return {
        name: vault.contract.name,
        earnFarm: !vaultsWithoutReward.has(vault.contract.name),
        farmToClaim: 0,
        stakedBalance: 0,
        percentOfPool,
        value: 0,
        unstakedBalance: prettyVaultBalance,
        address: vault.contract.address,
        underlyingBalance: prettyVaultBalance,
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

export const getBSCAssets = async (
  walletAddress: string,
): Promise<IAssetsInfo[]> => {
  // set the provider you want from Web3.providers
  const web3 = new Web3(BSC_URL)

  const [vaults, pools, bFarmPrice] = await Promise.all<
    IVault[],
    IPool[],
    number
  >([
    API.getBSCVaults(),
    API.getBSCPools(),
    API.getBSCPrice(
      bFarmAddress,
      DEFAULT_BSC_ORACLE_CONTRACT_FOR_GETTING_PRICES,
    ),
  ])

  const getAssetsFromPool = async (
    pool: IPool,
    relatedVault?: IVault,
  ): Promise<IAssetsInfo> => {
    const lpTokenContract = new web3.eth.Contract(
      FTOKEN_ABI,
      pool.lpToken.address,
    )

    const poolContract = new web3.eth.Contract(
      REWARDS_ABI,
      pool.contract.address,
    )

    const underlyingContract = new web3.eth.Contract(
      BSC_UNDERLYING_ABI,
      relatedVault ? relatedVault.underlying.address : pool.lpToken.address,
    )

    const priceAddress = relatedVault
      ? relatedVault.underlying.address
      : pool.lpToken.address
    /**
     * lpTokenBalance - balance of a wallet in the liquidity-pool
     * poolBalance - balance of a wallet in the pool
     * reward - reward of a wallet in the pool
     * pricePerFullShareLpToken = (nativeToken / fToken ) * 10 ** lpTokenDecimals
     */
    const [
      lpTokenBalance,
      poolBalance,
      reward,
      pricePerFullShareLpToken,
      lpTokenDecimals,
    ] = await Promise.all<string, string, string, string | null, number>([
      lpTokenContract.methods.balanceOf(walletAddress).call(),
      poolContract.methods.balanceOf(walletAddress).call(),
      poolContract.methods.earned(walletAddress).call(),
      relatedVault
        ? lpTokenContract.methods.getPricePerFullShare().call()
        : null,
      relatedVault ? relatedVault.decimals : lpTokenContract.methods.decimals(),
    ])

    const prettyLpTokenBalance = Number(lpTokenBalance) / 10 ** lpTokenDecimals
    const prettyPoolBalance = Number(poolBalance) / 10 ** lpTokenDecimals

    const prettyPricePerFullShareLpToken = pricePerFullShareLpToken
      ? Number(pricePerFullShareLpToken) / 10 ** lpTokenDecimals
      : 1

    const prettyRewardTokenBalance = Number(reward) / 10 ** farmDecimals

    /**
     * factory - determines which contract address should be used to get underlying token prices
     * poolTotalSupply - the total number of tokens in the pool of all participants
     */
    const [factory, poolTotalSupply] = await Promise.all<
      string | undefined,
      number
    >([
      prettyPoolBalance
        ? Promise.resolve(
            underlyingContract.methods.factory().call(),
          ).catch((e) => {})
        : undefined,
      prettyPoolBalance ? poolContract.methods.totalSupply().call() : 1,
    ])

    const oracleAddressForGettingPrices =
      factory?.toLowerCase() === LEGACY_BSC_FACTORY
        ? LEGACY_BSC_ORACLE_CONTRACT_FOR_GETTING_PRICES
        : DEFAULT_BSC_ORACLE_CONTRACT_FOR_GETTING_PRICES

    // underlyingPrice - the price are in USD
    const underlyingPrice = prettyPoolBalance
      ? await API.getBSCPrice(priceAddress, oracleAddressForGettingPrices)
      : 0

    const percentOfPool = (Number(poolBalance) / Number(poolTotalSupply)) * 100
    /** All account assets that contains in the pool are in USD */
    const calcValue = () => {
      return (
        underlyingPrice * prettyPoolBalance * prettyPricePerFullShareLpToken +
        bFarmPrice * prettyRewardTokenBalance
      )
    }
    // fTokens balance in underlying Tokens;
    const underlyingBalance = prettyPoolBalance * prettyPricePerFullShareLpToken
    return {
      name: relatedVault ? relatedVault.contract.name : pool.contract.name,
      earnFarm: true,
      farmToClaim: prettyRewardTokenBalance,
      stakedBalance: prettyPoolBalance,
      percentOfPool,
      value: calcValue(),
      unstakedBalance: prettyLpTokenBalance,
      address: relatedVault
        ? relatedVault.contract.address
        : pool.contract.address,
      underlyingBalance,
    }
  }

  const getAssetsFromVaults = (): Promise<IAssetsInfo>[] => {
    return vaults.map(async (vault: IVault) => {
      const vaultRelatedPool = pools.find((pool) => {
        return (
          vault.contract.address.toLowerCase() ===
          pool.lpToken.address.toLowerCase()
        )
      })
      if (vaultRelatedPool) {
        return getAssetsFromPool(vaultRelatedPool, vault)
      }

      const vaultContract = new web3.eth.Contract(
        FTOKEN_ABI,
        vault.contract.address,
      )

      const vaultBalance: number = await vaultContract.methods.balanceOf(
        walletAddress,
      )
      const prettyVaultBalance = Number(vaultBalance) / 10 ** vault.decimals

      const totalSupply = prettyVaultBalance
        ? await vaultContract.methods.totalSupply()
        : 1

      const percentOfPool = totalSupply
        ? (Number(vaultBalance) / Number(totalSupply)) * 100
        : 0

      return {
        name: vault.contract.name,
        earnFarm: !vaultsWithoutReward.has(vault.contract.name),
        farmToClaim: 0,
        stakedBalance: 0,
        percentOfPool,
        value: 0,
        unstakedBalance: prettyVaultBalance,
        address: vault.contract.address,
        underlyingBalance: prettyVaultBalance,
      }
    })
  }

  const assetsFromVaultsPromises: Promise<IAssetsInfo>[] = getAssetsFromVaults()

  const poolsWithoutVaults = pools.filter((pool: IPool) => {
    return !vaults.find(
      (vault) => vault.contract.address === pool.lpToken.address,
    )
  })

  const assetsFromPoolsWithoutVaultsPromises: Promise<IAssetsInfo>[] = poolsWithoutVaults.map(
    (pool) => getAssetsFromPool(pool),
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
