import { Contract } from 'web3-eth-contract'
import {
  BigNumberOne,
  BigNumberZero,
  ethereumOutdatedVaults,
  ethereumPoolsWithEarnedMethodTaking2Arguments,
  ETHEREUM_CONTRACT_FOR_GETTING_PRICES,
  ethWeb3,
  farmAddress,
  farmDecimals,
  iPSAddress,
  outdatedPools,
  PRICE_DECIMALS,
  PSAddress,
  vaultsWithoutReward,
} from '@/constants/constants'
import {
  ERC20_ABI_GET_PRICE_PER_FULL_SHARE,
  ETH_ORACLE_ABI_FOR_GETTING_PRICES,
  FARM_VAULT_ABI,
  FTOKEN_ABI,
  POOL_WITH_EARNED_METHOD_WITH_2_ARGUMENTS,
  PS_VAULT_ABI,
  REWARDS_ABI,
} from '@/lib/data/ABIs'
import { IAssetsInfo, IPool, IVault } from '@/types/entities'
import { BigNumber } from 'bignumber.js'
import { API } from '@/api'
import { BlockchainService } from '../BlockchainService.ts'
import Web3 from 'web3'

export class EthereumService {
  static async getAssetsFromPool(
    pool: IPool,
    walletAddress: string,
    farmPrice: BigNumber | null,
    relatedVault?: IVault,
  ): Promise<IAssetsInfo> {
    const lpTokenContract = new ethWeb3.eth.Contract(
      FTOKEN_ABI,
      pool.lpToken?.address,
    )

    const poolContract = new ethWeb3.eth.Contract(
      REWARDS_ABI,
      pool.contract.address,
    )
    // Pool where reward is iFarm
    const iFarmRewardPool = new ethWeb3.eth.Contract(
      ERC20_ABI_GET_PRICE_PER_FULL_SHARE,
      pool.rewardToken?.address,
    )

    const rewardIsFarm = pool.rewardToken?.address.toLowerCase() === farmAddress

    const priceAddress = relatedVault
      ? relatedVault.underlying?.address
      : pool.lpToken?.address
    /**
     * lpTokenBalance - balance of a wallet in the liquidity-pool
     * reward - reward of a wallet in the pool
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
      EthereumService.getEarned(
        walletAddress,
        poolContract,
        ethWeb3,
        pool.contract.address,
      ),
    ])

    const prettyRewardTokenBalance: BigNumber | null = reward
      ? new BigNumber(reward).dividedBy(10 ** farmDecimals)
      : null

    // should the method be called?
    const shouldGetPricePerFullShareBeCalled: boolean =
      !!prettyRewardTokenBalance &&
      !!prettyRewardTokenBalance.toNumber() &&
      !rewardIsFarm

    const getDecimals = async () => {
      if (relatedVault && relatedVault.decimals) {
        return relatedVault.decimals
      }
      return lpTokenBalance !== '0' || poolBalance !== '0'
        ? await BlockchainService.makeRequest(lpTokenContract, 'decimals')
        : null
    }

    /**
     * underlyingPrice - the price are in USD
     * iFarmPricePerFullShare = (iFARMPrice / farmPrice) * 10 ** rewardDecimals
     * poolTotalSupply - the total number of tokens in the pool of all participants
     * poolBalance - balance of a wallet in the pool (are in fToken)
     * pricePerFullShareLpToken = (nativeToken / fToken ) * 10 ** lpTokenDecimals
     */
    const [
      underlyingPrice,
      iFarmPricePerFullShare,
      poolTotalSupply,
      pricePerFullShareLpToken,
      lpTokenDecimals,
    ] = await Promise.all<
      BigNumber | null,
      string | null,
      string | null,
      string | null,
      number | string | null
    >([
      // EthereumService.calcUnderlyingPrice(poolBalance, priceAddress),
      BlockchainService.calcUnderlyingPrice(
        poolBalance,
        priceAddress,
        EthereumService.getPrice,
      ),

      shouldGetPricePerFullShareBeCalled
        ? BlockchainService.makeRequest(iFarmRewardPool, 'getPricePerFullShare')
        : null,

      poolBalance !== '0'
        ? poolContract.methods.totalSupply().call()
        : BigNumberOne,

      relatedVault && poolBalance !== '0'
        ? lpTokenContract.methods.getPricePerFullShare().call()
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

    const prettyPricePerFullShareLpToken =
      pricePerFullShareLpToken && lpTokenDecimals
        ? new BigNumber(pricePerFullShareLpToken).dividedBy(
            10 ** Number(lpTokenDecimals),
          )
        : 1

    const prettyRewardPricePerFullShare = iFarmPricePerFullShare
      ? new BigNumber(iFarmPricePerFullShare).dividedBy(10 ** farmDecimals)
      : null

    const rewardTokenAreInFARM = EthereumService.calcRewardTokenAreInFARM(
      rewardIsFarm,
      prettyRewardPricePerFullShare,
      prettyRewardTokenBalance,
    )

    const percentOfPool =
      poolBalance && poolTotalSupply
        ? new BigNumber(poolBalance)
            .dividedBy(new BigNumber(poolTotalSupply))
            .multipliedBy(100)
        : null

    /** All account assets that contains in the pool are in USD */
    const calcValue = (): BigNumber | null => {
      return underlyingPrice !== null &&
        underlyingPrice.toString() !== '0' &&
        rewardTokenAreInFARM !== null &&
        farmPrice !== null &&
        prettyPoolBalance
        ? underlyingPrice
            .multipliedBy(prettyPoolBalance)
            .multipliedBy(prettyPricePerFullShareLpToken)
            .plus(farmPrice.multipliedBy(rewardTokenAreInFARM))
        : null
    }

    // fTokens balance in underlying Tokens;
    const underlyingBalance = prettyPoolBalance
      ? prettyPoolBalance.multipliedBy(prettyPricePerFullShareLpToken)
      : null

    const name = relatedVault
      ? relatedVault.contract?.name || 'no name'
      : pool.contract?.name || 'no name'

    return {
      name,
      earnFarm: true,
      farmToClaim: rewardTokenAreInFARM,
      stakedBalance: prettyPoolBalance,
      percentOfPool,
      value: calcValue(),
      unstakedBalance: prettyLpTokenBalance,
      address: {
        vault: relatedVault?.contract?.address,
        pool: pool.contract?.address,
      },
      underlyingBalance,
    }
  }

  static getAssetsFromVaults(
    vaults: IVault[],
    pools: IPool[],
    walletAddress: string,
    farmPrice: BigNumber | null,
  ): Promise<IAssetsInfo>[] {
    return vaults.map(async (vault: IVault) => {
      // is this Vault iFarm?
      const isIFarm =
        vault.contract.address.toLowerCase() ===
        '0x1571eD0bed4D987fe2b498DdBaE7DFA19519F651'.toLowerCase()

      // is this Vault PS?
      const isPS = vault.contract.address.toLowerCase() === PSAddress

      // a pool that has the same token as a vault
      const vaultRelatedPool: IPool | undefined = pools.find((pool) => {
        return (
          vault.contract?.address?.toLowerCase() ===
          pool.lpToken?.address?.toLowerCase()
        )
      })

      const vaultContract = new ethWeb3.eth.Contract(
        FTOKEN_ABI,
        vault.contract.address,
      )

      if (vaultRelatedPool) {
        return EthereumService.getAssetsFromPool(
          vaultRelatedPool,
          walletAddress,
          farmPrice,
          vault,
        )
      }
      if (isIFarm) {
        const farmContract = new ethWeb3.eth.Contract(
          FARM_VAULT_ABI,
          vault.underlying!.address,
        )

        const [
          vaultBalance,
          farmBalance,
          totalSupply,
          underlyingBalanceWithInvestmentForHolder,
          pricePerFullShare,
        ] = await Promise.all<
          string | null,
          string | null,
          string | null,
          string | null,
          string | null
        >([
          BlockchainService.makeRequest(
            vaultContract,
            'balanceOf',
            walletAddress,
          ),
          BlockchainService.makeRequest(
            farmContract,
            'balanceOf',
            walletAddress,
          ),
          BlockchainService.makeRequest(vaultContract, 'totalSupply'),
          BlockchainService.makeRequest(
            vaultContract,
            'underlyingBalanceWithInvestmentForHolder',
            walletAddress,
          ),
          BlockchainService.makeRequest(vaultContract, 'getPricePerFullShare'),
        ])

        const prettyFarmBalance: BigNumber | null = farmBalance
          ? new BigNumber(farmBalance).dividedBy(10 ** farmDecimals)
          : null

        const prettyVaultBalance: BigNumber | null = vaultBalance
          ? new BigNumber(vaultBalance).dividedBy(10 ** vault.decimals!)
          : null

        const prettyUnderlyingBalanceWithInvestmentForHolder =
          underlyingBalanceWithInvestmentForHolder
            ? new BigNumber(underlyingBalanceWithInvestmentForHolder)
            : null

        const prettyPricePerFullShare: BigNumber | null = pricePerFullShare
          ? new BigNumber(pricePerFullShare).dividedBy(10 ** vault.decimals!)
          : null

        const value: BigNumber | null =
          farmPrice !== null && prettyUnderlyingBalanceWithInvestmentForHolder
            ? prettyUnderlyingBalanceWithInvestmentForHolder
                .multipliedBy(farmPrice)
                .dividedBy(10 ** vault.decimals!)
            : null

        const percentOfPool: BigNumber | null =
          vaultBalance && totalSupply
            ? new BigNumber(vaultBalance)
                .dividedBy(new BigNumber(totalSupply))
                .multipliedBy(new BigNumber(100))
            : null

        const underlyingBalance: BigNumber | null =
          prettyVaultBalance && prettyPricePerFullShare
            ? prettyVaultBalance.multipliedBy(prettyPricePerFullShare)
            : null

        return {
          name: vault.contract.name,
          earnFarm: true,
          farmToClaim: BigNumberZero,
          stakedBalance: prettyVaultBalance,
          percentOfPool,
          value,
          unstakedBalance: prettyFarmBalance,
          address: { vault: vault.contract.address },
          underlyingBalance,
        }
      }

      if (isPS) {
        const farmContract = new ethWeb3.eth.Contract(
          FARM_VAULT_ABI,
          farmAddress,
        )

        const PSvaultContract = new ethWeb3.eth.Contract(
          PS_VAULT_ABI,
          vault.contract.address,
        )

        const [vaultBalance, farmBalance] = await Promise.all<
          string | null,
          string | null
        >([
          BlockchainService.makeRequest(
            PSvaultContract,
            'balanceOf',
            walletAddress,
          ),
          BlockchainService.makeRequest(
            farmContract,
            'balanceOf',
            walletAddress,
          ),
        ])

        const totalValue: string | null =
          vaultBalance && vaultBalance !== '0'
            ? await BlockchainService.makeRequest(PSvaultContract, 'totalValue')
            : null

        const percentOfPool =
          totalValue && vaultBalance
            ? new BigNumber(vaultBalance)
                .dividedBy(new BigNumber(totalValue))
                .multipliedBy(100)
            : BigNumberZero

        const prettyVaultBalance = vaultBalance
          ? new BigNumber(vaultBalance).dividedBy(10 ** vault.decimals!)
          : null

        const prettyFarmBalance = farmBalance
          ? new BigNumber(farmBalance).dividedBy(10 ** farmDecimals)
          : null

        const value: BigNumber | null =
          prettyVaultBalance && farmPrice
            ? prettyVaultBalance.multipliedBy(farmPrice)
            : null
        return {
          name: vault.contract?.name || 'no name',
          earnFarm: !vaultsWithoutReward.has(vault.contract.name),
          farmToClaim: BigNumberZero,
          stakedBalance: prettyVaultBalance,
          percentOfPool,
          value,
          unstakedBalance: prettyFarmBalance,
          address: { vault: vault.contract.address },
          underlyingBalance: prettyVaultBalance,
        }
      }

      // Case: vault without pool
      const vaultBalance: string = await vaultContract.methods
        .balanceOf(walletAddress)
        .call()

      const prettyVaultBalance = vault.decimals
        ? new BigNumber(vaultBalance).dividedBy(10 ** vault.decimals)
        : null

      return {
        name: `${vault.contract.name} (has not pool)`,
        earnFarm: !vaultsWithoutReward.has(vault.contract.name),
        farmToClaim: BigNumberZero,
        stakedBalance: BigNumberZero,
        percentOfPool: BigNumberZero,
        value: null,
        unstakedBalance: prettyVaultBalance,
        address: { vault: vault.contract.address },
        underlyingBalance: prettyVaultBalance,
      }
    })
  }

  // Case 1: Vault has pool: 1.1 pool has Farm reward, 1.2 pool has iFarm reward
  // Case 2: Vault has no pool.
  // Case 3: Pool without Vault.
  // Case 4: Vault it is iFarm.
  // Case 5: Vault it is PS.
  static getAssets = async (walletAddress: string): Promise<IAssetsInfo[]> => {
    // get all pools and vaults
    const [pools, vaults, farmPrice] = await Promise.all<
      IPool[],
      IVault[],
      BigNumber | null
    >([
      API.getEthereumPools(),
      API.getEthereumVaults(),
      EthereumService.getPrice(farmAddress),
    ])

    const actualVaults = vaults.filter((v) => {
      return !ethereumOutdatedVaults.has(v.contract.address.toLowerCase())
    })

    actualVaults.push(iPSAddress)

    const actualPools = pools.filter((p) => {
      return p.contract?.address && !outdatedPools.has(p.contract.address)
    })

    const assetsFromVaultsPromises = EthereumService.getAssetsFromVaults(
      actualVaults,
      actualPools,
      walletAddress,
      farmPrice,
    )

    const poolsWithoutVaults = actualPools.filter((pool) => {
      return !vaults.find(
        (vault) => vault.contract.address === pool.lpToken?.address,
      )
    })

    const assetsFromPoolsWithoutVaultsPromises = poolsWithoutVaults.map(
      (pool) =>
        EthereumService.getAssetsFromPool(pool, walletAddress, farmPrice),
    )

    const assetsDataResolved: IAssetsInfo[] = await Promise.all([
      ...assetsFromVaultsPromises,
      ...assetsFromPoolsWithoutVaultsPromises,
    ])
    const nonZeroAssets = assetsDataResolved.filter((asset) => {
      return (
        asset.farmToClaim?.toNumber() ||
        asset.stakedBalance?.toNumber() ||
        (asset.value && asset.value.toNumber()) ||
        asset.underlyingBalance?.toNumber()
      )
    })

    return nonZeroAssets
  }

  static async getPrice(tokenAddress?: string): Promise<BigNumber | null> {
    const gettingPricesContract = new ethWeb3.eth.Contract(
      ETH_ORACLE_ABI_FOR_GETTING_PRICES,
      ETHEREUM_CONTRACT_FOR_GETTING_PRICES,
    )

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

  // the 'earned' method of a smart-contract can have one or two arguments
  static async getEarned(
    walletAddress: string,
    poolContract: Contract,
    web3: Web3,
    poolAddress: string,
  ): Promise<string | null> {
    const poolContractHavingTwoArguments = new web3.eth.Contract(
      POOL_WITH_EARNED_METHOD_WITH_2_ARGUMENTS,
      poolAddress,
    )

    let earned: string | null = ''

    if (
      ethereumPoolsWithEarnedMethodTaking2Arguments.has(
        poolAddress.toLocaleLowerCase(),
      )
    ) {
      return await BlockchainService.makeRequest(
        poolContractHavingTwoArguments,
        'earned',
        0,
        walletAddress,
      )
    }

    earned = await BlockchainService.makeRequest(
      poolContract,
      'earned',
      walletAddress,
    )

    if (earned === null) {
      earned = await BlockchainService.makeRequest(
        poolContractHavingTwoArguments,
        'earned',
        0,
        walletAddress,
      )
    }

    return earned
  }

  static calcRewardTokenAreInFARM(
    rewardIsFarm: boolean,
    prettyRewardPricePerFullShare: BigNumber | null,
    prettyRewardTokenBalance: BigNumber | null,
  ): BigNumber | null {
    if (rewardIsFarm) {
      return prettyRewardTokenBalance
    }
    return prettyRewardTokenBalance && prettyRewardPricePerFullShare
      ? prettyRewardTokenBalance.multipliedBy(prettyRewardPricePerFullShare)
      : null
  }
}
