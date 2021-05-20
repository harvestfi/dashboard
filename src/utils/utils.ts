import Web3 from 'web3'
import BigNumber from 'bignumber.js'

import { API, blockchainAPI } from '../api'
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
  PSAddress,
} from '../constants/constants'
import {
  FTOKEN_ABI,
  REWARDS_ABI,
  ERC20_ABI_GET_PRICE_PER_FULL_SHARE,
  FARM_VAULT_ABI,
  BSC_UNDERLYING_ABI,
  PS_VAULT_ABI,
} from '../lib/data/ABIs'
import { IPool, IVault, IAssetsInfo } from '../types'

const BigNumberZero = new BigNumber(0)

const BigNumberOne = new BigNumber(1)

const currencyFormatter = (currency: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  })

const numberFormatter = () =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 })

export const prettyNumber = (number: number) => {
  return numberFormatter().format(number)
}

export const prettyCurrency = (balance: number, currency: string) => {
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
): Promise<IAssetsInfo[]> => {
  // set the provider you want from Web3.providers
  const web3 = new Web3(process.env.REACT_APP_ETH_URL!)

  // get all pools and vaults
  const [pools, vaults, farmPrice] = await Promise.all<
    IPool[],
    IVault[],
    BigNumber
  >([API.getPools(), API.getVaults(), API.getEtheriumPrice(farmAddress)])

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
    const lpTokenContract = new web3.eth.Contract(
      FTOKEN_ABI,
      pool.lpToken.address,
    )

    const poolContract = new web3.eth.Contract(
      REWARDS_ABI,
      pool.contract.address,
    )
    // Pool where reward is iFarm
    const iFarmRewardPool = new web3.eth.Contract(
      ERC20_ABI_GET_PRICE_PER_FULL_SHARE,
      pool.rewardToken.address,
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
     */
    let lpTokenBalance: string | null,
      poolBalance: string | null,
      reward: string | null
    try {
      ;[lpTokenBalance, poolBalance, reward] = await Promise.all<
        string | null,
        string | null,
        string | null
      >([
        blockchainAPI.makeRequest(lpTokenContract, 'balanceOf', walletAddress),
        blockchainAPI.makeRequest(poolContract, 'balanceOf', walletAddress),
        blockchainAPI.getEarned(
          walletAddress,
          poolContract,
          web3,
          pool.contract.address,
        ),
      ])
    } catch (error) {
      console.log(
        `Error: some problem with this pool ${pool.contract.address}`,
        error,
      )
    }

    const prettyRewardTokenBalance = new BigNumber(reward).dividedBy(
      10 ** farmDecimals,
    )

    // should the method be called?
    const shouldGetPricePerFullShareBeCalled: boolean =
      !!prettyRewardTokenBalance.toNumber() && !rewardIsFarm

    const getDecimals = () => {
      if (relatedVault) {
        return relatedVault.decimals
      }
      return lpTokenBalance !== '0' || poolBalance !== '0'
        ? lpTokenContract.methods.decimals().call()
        : null
    }

    /**
     * underlyingPrice - the price are in USD
     * iFarmPricePerFullShare = (iFARMPrice / farmPrice) * 10 ** rewardDecimals
     * poolBalance - balance of a wallet in the pool (are in fToken)
     * pricePerFullShareLpToken = (nativeToken / fToken ) * 10 ** lpTokenDecimals
     */
    let underlyingPrice: BigNumber,
      iFarmPricePerFullShare: string | false,
      poolTotalSupply: string,
      pricePerFullShareLpToken: string | null,
      lpTokenDecimals: number | null

    try {
      ;[
        underlyingPrice,
        iFarmPricePerFullShare,
        poolTotalSupply,
        pricePerFullShareLpToken,
        lpTokenDecimals,
      ] = await Promise.all<
        BigNumber,
        string | false,
        string,
        string | null,
        number | null
      >([
        poolBalance !== '0'
          ? API.getEtheriumPrice(priceAddress)
          : BigNumberZero,

        shouldGetPricePerFullShareBeCalled &&
          iFarmRewardPool.methods.getPricePerFullShare().call(),

        poolBalance !== '0'
          ? poolContract.methods.totalSupply().call()
          : BigNumberOne,

        relatedVault && poolBalance !== '0'
          ? lpTokenContract.methods.getPricePerFullShare().call()
          : null,

        getDecimals(),
      ])
    } catch (error) {
      console.log(
        `Error: some problem with this pool ${pool.contract.address}`,
        error,
      )
    }

    const prettyLpTokenBalance = lpTokenDecimals
      ? new BigNumber(lpTokenBalance).dividedBy(10 ** lpTokenDecimals)
      : BigNumberZero

    const prettyPoolBalance = lpTokenDecimals
      ? new BigNumber(poolBalance).dividedBy(10 ** lpTokenDecimals)
      : BigNumberZero

    const prettyPricePerFullShareLpToken =
      pricePerFullShareLpToken && lpTokenDecimals
        ? new BigNumber(pricePerFullShareLpToken).dividedBy(
            10 ** lpTokenDecimals,
          )
        : 1

    const prettyRewardPricePerFullShare = iFarmPricePerFullShare
      ? new BigNumber(iFarmPricePerFullShare).dividedBy(10 ** farmDecimals)
      : BigNumberOne

    const rewardTokenAreInFARM = prettyRewardTokenBalance.multipliedBy(
      prettyRewardPricePerFullShare,
    )

    const percentOfPool = new BigNumber(poolBalance)
      .dividedBy(new BigNumber(poolTotalSupply))
      .multipliedBy(100)

    /** All account assets that contains in the pool are in USD */
    const calcValue = (): BigNumber | null => {
      return underlyingPrice.toString() !== '0'
        ? underlyingPrice
            .multipliedBy(prettyPoolBalance)
            .multipliedBy(prettyPricePerFullShareLpToken)
            .plus(farmPrice.multipliedBy(rewardTokenAreInFARM))
        : null
    }

    // fTokens balance in underlying Tokens;
    const underlyingBalance = prettyPoolBalance.multipliedBy(
      prettyPricePerFullShareLpToken,
    )

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
      const isPS = vault.contract.address.toLowerCase() === PSAddress

      // a pool that has the same token as a vault
      const vaultRelatedPool: IPool | undefined = actualPools.find((pool) => {
        return (
          vault.contract.address.toLowerCase() ===
          pool.lpToken.address.toLowerCase()
        )
      })

      const vaultContract = new web3.eth.Contract(
        FTOKEN_ABI,
        vault.contract.address,
      )

      if (vaultRelatedPool) {
        return getAssetsFromPool(vaultRelatedPool, vault)
      }
      if (isIFarm) {
        const farmContract = new web3.eth.Contract(
          FARM_VAULT_ABI,
          vault.underlying.address,
        )
        let vaultBalance: string,
          farmBalance: string,
          totalSupply: string,
          underlyingBalanceWithInvestmentForHolder: string,
          pricePerFullShare: string

        try {
          ;[
            vaultBalance,
            farmBalance,
            totalSupply,
            underlyingBalanceWithInvestmentForHolder,
            pricePerFullShare,
          ] = await Promise.all<string, string, string, string, string>([
            vaultContract.methods.balanceOf(walletAddress).call(),
            farmContract.methods.balanceOf(walletAddress).call(),
            vaultContract.methods.totalSupply().call(),
            vaultContract.methods
              .underlyingBalanceWithInvestmentForHolder(walletAddress)
              .call(),
            vaultContract.methods.getPricePerFullShare().call(),
          ])
        } catch (error) {
          console.log('Some problem with iFarm pool', error)
        }

        const prettyFarmBalance = new BigNumber(farmBalance).dividedBy(
          10 ** farmDecimals,
        )

        const prettyVaultBalance = new BigNumber(vaultBalance).dividedBy(
          10 ** vault.decimals,
        )

        const prettyUnderlyingBalanceWithInvestmentForHolder = new BigNumber(
          underlyingBalanceWithInvestmentForHolder,
        )

        const prettyPricePerFullShare = new BigNumber(
          pricePerFullShare,
        ).dividedBy(10 ** vault.decimals)

        const value = prettyUnderlyingBalanceWithInvestmentForHolder
          .multipliedBy(farmPrice)
          .dividedBy(10 ** vault.decimals)

        const percentOfPool = new BigNumber(vaultBalance)
          .dividedBy(new BigNumber(totalSupply))
          .multipliedBy(new BigNumber(100))

        const underlyingBalance = prettyVaultBalance.multipliedBy(
          prettyPricePerFullShare,
        )

        return {
          name: vault.contract.name,
          earnFarm: true,
          farmToClaim: BigNumberZero,
          stakedBalance: prettyVaultBalance,
          percentOfPool,
          value,
          unstakedBalance: prettyFarmBalance,
          address: vault.contract.address,
          underlyingBalance,
        }
      }

      if (isPS) {
        const farmContract = new web3.eth.Contract(FARM_VAULT_ABI, farmAddress)

        const PSvaultContract = new web3.eth.Contract(
          PS_VAULT_ABI,
          vault.contract.address,
        )

        const [vaultBalance, farmBalance] = await Promise.all<string, string>([
          PSvaultContract.methods.balanceOf(walletAddress).call(),
          farmContract.methods.balanceOf(walletAddress).call(),
        ])

        const totalValue: string | null =
          vaultBalance !== '0'
            ? await PSvaultContract.methods.totalValue().call()
            : null

        const percentOfPool = totalValue
          ? new BigNumber(vaultBalance)
              .dividedBy(new BigNumber(totalValue))
              .multipliedBy(100)
          : BigNumberZero

        const prettyVaultBalance = new BigNumber(vaultBalance).dividedBy(
          10 ** vault.decimals,
        )

        const prettyFarmBalance = new BigNumber(farmBalance).dividedBy(
          10 ** farmDecimals,
        )

        const value = prettyVaultBalance.multipliedBy(farmPrice)

        return {
          name: vault.contract.name,
          earnFarm: !vaultsWithoutReward.has(vault.contract.name),
          farmToClaim: BigNumberZero,
          stakedBalance: prettyVaultBalance,
          percentOfPool,
          value,
          unstakedBalance: prettyFarmBalance,
          address: vault.contract.address,
          underlyingBalance: prettyVaultBalance,
        }
      }

      // Case: vault without pool
      const vaultBalance: string = await vaultContract.methods
        .balanceOf(walletAddress)
        .call()

      const prettyVaultBalance = new BigNumber(vaultBalance).dividedBy(
        10 ** vault.decimals,
      )

      return {
        name: `${vault.contract.name} (has not pool)`,
        earnFarm: !vaultsWithoutReward.has(vault.contract.name),
        farmToClaim: BigNumberZero,
        stakedBalance: BigNumberZero,
        percentOfPool: BigNumberZero,
        value: null,
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
      asset.farmToClaim.toNumber() ||
      asset.stakedBalance.toNumber() ||
      (asset.value && asset.value.toNumber()) ||
      asset.unstakedBalance.toNumber() ||
      asset.underlyingBalance.toNumber()
    )
  })

  return nonZeroAssets
}

export const getBSCAssets = async (
  walletAddress: string,
): Promise<IAssetsInfo[]> => {
  // set the provider you want from Web3.providers
  const web3 = new Web3(BSC_URL)

  let vaults: IVault[], pools: IPool[], bFarmPrice: BigNumber

  try {
    ;[vaults, pools, bFarmPrice] = await Promise.all<
      IVault[],
      IPool[],
      BigNumber
    >([
      API.getBSCVaults(),
      API.getBSCPools(),
      API.getBSCPrice(
        bFarmAddress,
        DEFAULT_BSC_ORACLE_CONTRACT_FOR_GETTING_PRICES,
      ),
    ])
  } catch (error) {
    console.log('Something wrong', error)
  }

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
    let lpTokenBalance: string, poolBalance: string, reward: string
    try {
      ;[lpTokenBalance, poolBalance, reward] = await Promise.all<
        string,
        string,
        string
      >([
        lpTokenContract.methods.balanceOf(walletAddress).call(),
        poolContract.methods.balanceOf(walletAddress).call(),
        poolContract.methods.earned(walletAddress).call(),
      ])
    } catch (error) {
      console.log(
        `Something wrong. Pool address: ${pool.contract.address}`,
        error,
      )
      return
    }

    const prettyRewardTokenBalance = new BigNumber(reward).dividedBy(
      10 ** farmDecimals,
    )

    const getDecimals = (): number | null => {
      if (relatedVault) {
        return relatedVault.decimals
      }
      return lpTokenBalance !== '0' || poolBalance !== '0'
        ? lpTokenContract.methods.decimals().call()
        : null
    }

    /**
     * factory - determines which contract address should be used to get underlying token prices
     * poolTotalSupply - the total number of tokens in the pool of all participants
     */
    let factory: string | null,
      poolTotalSupply: string | null,
      lpTokenPricePerFullShare: string | null,
      lpTokenDecimals: number | null

    try {
      ;[
        factory,
        poolTotalSupply,
        lpTokenPricePerFullShare,
        lpTokenDecimals,
      ] = await Promise.all<
        string | null,
        string | null,
        string | null,
        number | null
      >([
        poolBalance !== '0'
          ? Promise.resolve(
              underlyingContract.methods.factory().call(),
              // TODO create error handler
            ).catch(() => {})
          : null,

        poolBalance !== '0' ? poolContract.methods.totalSupply().call() : null,

        relatedVault && poolBalance !== '0'
          ? lpTokenContract.methods.getPricePerFullShare().call()
          : null,

        getDecimals(),
      ])
    } catch (error) {
      console.log('Something wrong', error)
    }

    const prettyLpTokenBalance = lpTokenDecimals
      ? new BigNumber(lpTokenBalance).dividedBy(10 ** lpTokenDecimals)
      : BigNumberZero

    const prettyPoolBalance = lpTokenDecimals
      ? new BigNumber(poolBalance).dividedBy(10 ** lpTokenDecimals)
      : BigNumberZero

    const lpTokenPrettyPricePerFullShare =
      lpTokenPricePerFullShare && lpTokenDecimals
        ? new BigNumber(lpTokenPricePerFullShare).dividedBy(
            10 ** lpTokenDecimals,
          )
        : BigNumberOne

    const oracleAddressForGettingPrices =
      factory?.toLowerCase() === LEGACY_BSC_FACTORY
        ? LEGACY_BSC_ORACLE_CONTRACT_FOR_GETTING_PRICES
        : DEFAULT_BSC_ORACLE_CONTRACT_FOR_GETTING_PRICES

    // underlyingPrice - the price are in USD
    const underlyingPrice: BigNumber =
      poolBalance !== '0'
        ? await API.getBSCPrice(priceAddress, oracleAddressForGettingPrices)
        : new BigNumber(0)

    const percentOfPool = poolTotalSupply
      ? new BigNumber(poolBalance).dividedBy(poolTotalSupply).multipliedBy(100)
      : null

    /** All account assets that contains in the pool are in USD */
    const calcValue = () => {
      return underlyingPrice
        ? underlyingPrice
            .multipliedBy(prettyPoolBalance)
            .multipliedBy(lpTokenPrettyPricePerFullShare)
            .plus(bFarmPrice.multipliedBy(prettyRewardTokenBalance))
        : null
    }
    // fTokens balance in underlying Tokens;
    const underlyingBalance = prettyPoolBalance.multipliedBy(
      lpTokenPrettyPricePerFullShare,
    )
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

      let vaultBalance: BigNumber
      try {
        vaultBalance = new BigNumber(
          await vaultContract.methods.balanceOf(walletAddress).call(),
        )
      } catch (error) {
        console.log(
          'Something wrong in the balanceOf method of the BSC Contract',
          error,
        )
      }

      const prettyVaultBalance = new BigNumber(vaultBalance).dividedBy(
        10 ** vault.decimals,
      )
      let totalSupply: BigNumber
      try {
        totalSupply =
          vaultBalance.toString() !== '0'
            ? new BigNumber(await vaultContract.methods.totalSupply())
            : BigNumberOne
      } catch (error) {
        console.log(
          `Something wrong in the bsc method totalSupply. Vault address: ${vault.contract.address}`,
        )
      }

      const percentOfPool: BigNumber =
        totalSupply.toString() !== '0'
          ? vaultBalance.dividedToIntegerBy(totalSupply).multipliedBy(100)
          : BigNumberZero

      return {
        name: vault.contract.name,
        earnFarm: !vaultsWithoutReward.has(vault.contract.name),
        farmToClaim: BigNumberZero,
        stakedBalance: BigNumberZero,
        percentOfPool,
        value: null,
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
      asset.farmToClaim.toNumber() ||
      asset.stakedBalance.toNumber() ||
      (asset.value && asset.value.toNumber()) ||
      asset.unstakedBalance.toNumber() ||
      asset.underlyingBalance.toNumber()
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
