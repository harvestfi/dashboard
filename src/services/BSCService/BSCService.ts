import {
  BSCWeb3,
  farmDecimals,
  vaultsWithoutReward,
  bFarmAddress,
  bscOutdatedVaults,
  LEGACY_BSC_FACTORY,
  CONTRACTS_FOR_PRICES,
  CONTRACTS_FOR_PRICES_KEYS,
  PRICE_DECIMALS,
} from '@/constants/constants'

import { BSC_UNDERLYING_ABI, FTOKEN_ABI, REWARDS_ABI } from '@/lib/data/ABIs'
import { IAssetsInfo, IPool, IVault } from '@/types/entities'
import { BigNumber } from 'bignumber.js'
import { API } from '@/api'
import { BlockchainService } from '../BlockchainService'

export class BSCService {
  static async getAssetsFromPool(
    pool: IPool,
    walletAddress: string,
    bFarmPrice: BigNumber | null,
    relatedVault?: IVault,
  ): Promise<IAssetsInfo> {
    const lpTokenContract = new BSCWeb3.eth.Contract(
      FTOKEN_ABI,
      pool.lpToken?.address,
    )

    const poolContract = new BSCWeb3.eth.Contract(
      REWARDS_ABI,
      pool.contract.address,
    )

    /**
     * lpTokenBalance - balance of a wallet in the liquidity-pool
     * poolBalance - balance of a wallet in the pool
     * reward - reward of a wallet in the pool
     * pricePerFullShareLpToken = (nativeToken / fToken ) * 10 ** lpTokenDecimals
     */
    const [lpTokenBalance, poolBalance, reward] = await Promise.all<
      string | null,
      string | null,
      string | null
    >([
      BlockchainService.makeRequest(
        lpTokenContract,
        'balanceOf',
        walletAddress,
      ),
      BlockchainService.makeRequest(poolContract, 'balanceOf', walletAddress),
      BlockchainService.makeRequest(poolContract, 'earned', walletAddress),
    ])

    const prettyRewardTokenBalance =
      reward === null
        ? null
        : new BigNumber(reward).dividedBy(10 ** farmDecimals)

    const getDecimals = async (): Promise<string | null | number> => {
      if (relatedVault) {
        return relatedVault.decimals ? relatedVault.decimals : null
      }

      return lpTokenBalance === '0' ||
        lpTokenBalance === null ||
        poolBalance === '0' ||
        poolBalance === null
        ? BlockchainService.makeRequest(lpTokenContract, 'decimals')
        : null
    }

    const priceAddress = relatedVault
      ? relatedVault.underlying?.address
      : pool.lpToken?.address
    /**
     * poolTotalSupply - the total number of tokens in the pool of all participants
     */
    const [
      underlyingPrice,
      poolTotalSupply,
      lpTokenPricePerFullShare,
      lpTokenDecimals,
    ] = await Promise.all<
      BigNumber | null,
      string | null,
      string | null,
      number | string | null
    >([
      BlockchainService.calcUnderlyingPrice(
        poolBalance,
        priceAddress,
        BSCService.getPriceUsingFactory,
      ),

      poolBalance !== '0'
        ? BlockchainService.makeRequest(poolContract, 'totalSupply')
        : null,

      relatedVault && poolBalance !== '0'
        ? BlockchainService.makeRequest(lpTokenContract, 'getPricePerFullShare')
        : null,

      getDecimals(),
    ])

    const prettyLpTokenBalance =
      lpTokenDecimals && lpTokenBalance
        ? new BigNumber(lpTokenBalance).dividedBy(10 ** Number(lpTokenDecimals))
        : null

    const prettyPoolBalance =
      lpTokenDecimals && poolBalance
        ? new BigNumber(poolBalance).dividedBy(10 ** Number(lpTokenDecimals))
        : null

    const lpTokenPrettyPricePerFullShare =
      lpTokenPricePerFullShare && lpTokenDecimals
        ? new BigNumber(lpTokenPricePerFullShare).dividedBy(
            10 ** Number(lpTokenDecimals),
          )
        : null

    const percentOfPool =
      poolTotalSupply && poolBalance
        ? new BigNumber(poolBalance)
            .dividedBy(poolTotalSupply)
            .multipliedBy(100)
        : null

    /** All account assets that contains in the pool are in USD */
    const calcValue = () => {
      return underlyingPrice !== null &&
        bFarmPrice &&
        prettyRewardTokenBalance &&
        prettyPoolBalance &&
        lpTokenPrettyPricePerFullShare
        ? underlyingPrice
            .multipliedBy(prettyPoolBalance)
            .multipliedBy(lpTokenPrettyPricePerFullShare)
            .plus(bFarmPrice.multipliedBy(prettyRewardTokenBalance))
        : null
    }
    // fTokens balance in underlying Tokens;
    const underlyingBalance =
      prettyPoolBalance && lpTokenPrettyPricePerFullShare
        ? prettyPoolBalance.multipliedBy(lpTokenPrettyPricePerFullShare)
        : null

    return {
      name: relatedVault ? relatedVault.contract.name : pool.contract.name,
      earnFarm: true,
      farmToClaim: prettyRewardTokenBalance,
      stakedBalance: prettyPoolBalance,
      percentOfPool,
      value: calcValue(),
      unstakedBalance: prettyLpTokenBalance,
      address: relatedVault
        ? { vault: relatedVault.contract.address }
        : { pool: pool.contract.address },
      underlyingBalance,
    }
  }

  static getAssetsFromVaults(
    vaults: IVault[],
    pools: IPool[],
    walletAddress: string,
    bFarmPrice: BigNumber | null,
  ): Promise<IAssetsInfo>[] {
    return vaults.map(async (vault: IVault) => {
      const vaultRelatedPool = pools.find((pool) => {
        return (
          vault.contract.address.toLowerCase() ===
          pool.lpToken?.address.toLowerCase()
        )
      })
      if (vaultRelatedPool) {
        return BSCService.getAssetsFromPool(
          vaultRelatedPool,
          walletAddress,
          bFarmPrice,
          vault,
        )
      }

      const vaultContract = new BSCWeb3.eth.Contract(
        FTOKEN_ABI,
        vault.contract.address,
      )

      const vaultBalance: string | null = await BlockchainService.makeRequest(
        vaultContract,
        'balanceOf',
        walletAddress,
      )

      const prettyVaultBalance =
        vaultBalance && vault.decimals
          ? new BigNumber(vaultBalance).dividedBy(10 ** vault.decimals)
          : null

      const totalSupply =
        vaultBalance && vaultBalance.toString() !== '0'
          ? await BlockchainService.makeRequest(vaultContract, 'totalSupply')
          : null

      const percentOfPool: BigNumber | null =
        totalSupply && vaultBalance && totalSupply.toString() !== '0'
          ? new BigNumber(vaultBalance)
              .dividedToIntegerBy(totalSupply)
              .multipliedBy(100)
          : null

      return {
        name: vault.contract.name,
        earnFarm: !vaultsWithoutReward.has(vault.contract.name),
        farmToClaim: null,
        stakedBalance: null,
        percentOfPool,
        value: null,
        unstakedBalance: prettyVaultBalance,
        address: { vault: vault.contract.address },
        underlyingBalance: prettyVaultBalance,
      }
    })
  }

  static async getAssets(walletAddress: string): Promise<IAssetsInfo[]> {
    const [vaults, pools, bFarmPrice] = await Promise.all<
      IVault[],
      IPool[],
      BigNumber | null
    >([
      API.getBSCVaults(),
      API.getBSCPools(),
      BSCService.getBSCPrice(bFarmAddress, 'default'),
    ])

    const actualVaults = vaults.filter((v) => {
      return !bscOutdatedVaults.has(v.contract.address)
    })

    const assetsFromVaultsPromises: Promise<IAssetsInfo>[] =
      BSCService.getAssetsFromVaults(
        actualVaults,
        pools,
        walletAddress,
        bFarmPrice,
      )

    const poolsWithoutVaults = pools.filter((pool: IPool) => {
      return !vaults.find(
        (vault) => vault.contract.address === pool.lpToken?.address,
      )
    })

    const assetsFromPoolsWithoutVaultsPromises: Promise<IAssetsInfo>[] =
      poolsWithoutVaults.map((pool) =>
        BSCService.getAssetsFromPool(pool, walletAddress, bFarmPrice),
      )

    const assetsDataResolved: IAssetsInfo[] = await Promise.all([
      ...assetsFromVaultsPromises,
      ...assetsFromPoolsWithoutVaultsPromises,
    ])
    const nonZeroAssets = assetsDataResolved.filter((asset) => {
      return (
        asset.farmToClaim?.toNumber() ||
        asset.stakedBalance?.toNumber() ||
        asset.value?.toNumber() ||
        asset.underlyingBalance?.toNumber()
      )
    })

    return nonZeroAssets
  }

  static async getPriceUsingFactory(
    underlyingAddress: string | undefined,
  ): Promise<BigNumber | null> {
    if (!BlockchainService.isValidAddress(underlyingAddress, BSCWeb3)) {
      return null
    }

    const underlyingContract = new BSCWeb3.eth.Contract(
      BSC_UNDERLYING_ABI,
      underlyingAddress,
    )

    // TODO how to distinguish a network error from a non-existent method?
    // factory - determines which contract address should be used to get underlying token prices
    const factory: string | null = await BlockchainService.makeRequest(
      underlyingContract,
      'factory',
    )

    // if the smart contract does not have the Factori method (factory === null), then we use the default
    // DEFAULT_BSC_ORACLE_CONTRACT_FOR_GETTING_PRICES
    const oracleAddressForGettingPrices =
      factory?.toLowerCase() === LEGACY_BSC_FACTORY.toLowerCase()
        ? 'legacy'
        : 'default'

    // underlyingPrice - the price are in USD
    const underlyingPrice: BigNumber | null = await BSCService.getBSCPrice(
      underlyingAddress,
      oracleAddressForGettingPrices,
    )

    return underlyingPrice
  }

  static async getBSCPrice(
    tokenAddress: string | undefined | null,
    contractsForGettingPrices: CONTRACTS_FOR_PRICES_KEYS,
  ): Promise<BigNumber | null> {
    const gettingPricesContract =
      CONTRACTS_FOR_PRICES[contractsForGettingPrices]

    const price: string | null = await BlockchainService.makeRequest(
      gettingPricesContract,
      'getPrice',
      tokenAddress,
    )

    const prettyPrice = price
      ? new BigNumber(price).dividedBy(10 ** PRICE_DECIMALS)
      : null

    return prettyPrice
  }
}
