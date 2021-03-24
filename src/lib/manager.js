import ethers from 'ethers';
import data from './data/deploys';
import RewardsPool from './pool';
import { UnderlyingBalances, getTokenFromAsset } from './tokens';
import { weekOne, test, weekTwo, activePools, inactivePools, allPastPools } from './poolUtils';

/**
 * Reward pool wrapper
 */
export class PoolManager {
  /**
   *  Instantiate from the hardcoded pools
   *
   * @param {Array} pools a list of pools
   * @param {Object} provider web3 provider
   */
  constructor(pools, provider) {
    this.pools = pools;
    this.provider = provider;
  }

  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static weekOne(provider) {
    return new PoolManager(weekOne(provider), provider);
  }

  static test(provider) {
    return new PoolManager(test(provider), provider);
  }

  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static weekTwo(provider) {
    return new PoolManager(weekTwo(provider), provider);
  }

  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static activePools(provider) {
    return new PoolManager(activePools(provider), provider);
  }

  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static inactivePools(provider) {
    return new PoolManager(inactivePools(provider), provider);
  }

  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static allPastPools(provider) {
    return new PoolManager(allPastPools(provider), provider);
  }

  /**
   * @param {Array} pools user address to check balances
   * @param {String} functionPath function to invoke
   * @param {Array} args array of function args
   * @param {String} propName name of prop to put result in
   * @return {Array} results
   */
  static mapToPools(pools, functionPath, args, propName) {
    const f = async pool => {
      const prop = propName || functionPath[functionPath.length - 1];
      // traverse props iteratively
      let func = pool;
      /* eslint-disable-next-line guard-for-in */
      functionPath.forEach(elem => {
        func = func[elem];
        if (!func) return null;
        return func;
      });

      if (func) {
        const output = {};
        output.name = pool.name;
        output.address = pool.address;
        output[prop] = await func.apply(pool, [...args]);
        return output;
      }

      return {};
    };
    return Promise.all(pools.map(f));
  }

  /**
   * @param {string} address user address
   * @return {Array} balances
   */
  staked(address) {
    return PoolManager.mapToPools(this.pools, ['balanceOf'], [address], 'stakedBalance');
  }

  /**
   * @param {string} address user address
   * @return {Array} balances
   */
  unstaked(address) {
    return PoolManager.mapToPools(this.pools, ['unstakedBalance'], [address], 'unstakedBalance');
  }

  /**
   * @param {string} address user address
   * @return {Array} rewards
   */
  earned(address) {
    return PoolManager.mapToPools(this.pools, ['earned'], [address], 'earnedRewards');
  }

  /**
   * @param {string} address user address
   * @return {Array} rewards
   */
  usdValues(address) {
    return PoolManager.mapToPools(this.pools, ['usdValueOf'], [address], 'usdValue');
  }

  /**
   * @param {string} address user address
   * @return {Array} rewards
   */
  historicalRewards(address) {
    return PoolManager.mapToPools(
      this.pools,
      ['historicalRewards'],
      [address],
      'historicalRewards',
    );
  }

  /**
   * @param {string} address user address
   * @return {BigNumber} total rewards
   */
  usdValueOf(address) {
    return this.usdValues(address).then(rewards => {
      let total = ethers.BigNumber.from(0);
      rewards.forEach(reward => {
        total = total.add(reward);
      });
      return total;
    });
  }

  /**
   * @param {string} address user address
   * @param {bool} passthrough unwrap interior tokens
   * @return {Array} lp token balances
   */
  underlying(address, passthrough) {
    return PoolManager.mapToPools(
      this.pools,
      ['underlyingBalanceOf'],
      [address, passthrough],
      'underlyingBalances',
    ).then(vs => vs.filter(v => !!v));
  }

  /**
   * Return aggregate underlying positions across all pools
   * @param {string} address user address
   * @param {bool} passthrough unwrap interior tokens
   * @return {Array} lp token balances
   */
  aggregateUnderlyings(address) {
    return this.underlying(address, true).then(underlyings => {
      const aggregateUnderlyings = new UnderlyingBalances();
      underlyings.reduce((acc, next) => {
        return acc.combine(next.underlyingBalances);
      }, aggregateUnderlyings);
      return aggregateUnderlyings;
    });
  }

  /**
   * @param {string} address user address
   * @return {Array} rewards
   */

  /**
   * @param {string} address user address
   * @return {Array} summaries
   */
  summary(address) {
    return PoolManager.mapToPools(this.pools, ['summary'], [address], 'summary');
  }

  /**
   * @param {BigNumberish} min minimum value to get per-pool. defaults to 10**18
   * @param {Object} overrides ethers overrides
   * @return {Array} array of txns
   */
  getRewards(min, overrides) {
    if (!ethers.Signer.isSigner(this.provider)) {
      throw new Error('No signer');
    }
    overrides = overrides || {};

    const address = this.provider.getAddress();
    const lowerBound = min || ethers.constants.WeiPerEther;

    const promises = this.pools.map(async pool => {
      if (pool.name !== 'FARM Profit Sharing') {
        const earned = await pool.earned(address);

        if (earned.gt(lowerBound)) {
          return {
            name: pool.name,
            getReward: await pool.getReward(overrides),
          };
        }
      }
      return null;
    });

    return Promise.all(promises).then(vals => vals.filter(val => !!val));
  }

  /**
   * Return information about Ifarm assets for the current address
   * @param {string} address user address
   * @return {Object|null} iFarm token
   */
  async iFarmSummary(address) {
    try {
      const iFARM = data.assetByName('iFARM');
      const token = getTokenFromAsset(iFARM, this.provider);
      const underlayingAsset = getTokenFromAsset(iFARM.underlyingAsset, this.provider);
      const stakedBalance = await token.balanceOf(address);
      if (stakedBalance.isZero()) {
        return null;
      }
      const underlyingBalance = await token.underlyingBalanceWithInvestmentForHolder(address);
      const pricePerFullShare = await token.getPricePerFullShare();
      const usdValueOf = await underlayingAsset.usdValueOf(underlyingBalance);
      return {
        name: 'iFARM Profit Sharing',
        address: token.address,
        summary: {
          address: token.address,
          user: address,
          pool: {
            name: 'iFARM Pool',
            asset: data.assetByName('iFARM'),
            address: '0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50',
            rewardAsset: data.assetByName('FARM'),
          },
          isActive: true,
          stakedBalance,
          underlyingBalanceOf: {
            name: 'FARM',
            balances: { FARM: underlyingBalance },
          },
          unstakedBalance: ethers.BigNumber.from(0),
          earnedRewards: ethers.BigNumber.from(0),
          percentageOwnership: '0.000%',
          usdValueOf,
          historicalRewards: ethers.BigNumber.from(0),
          pricePerFullShare,
        },
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  exitPools(pools, overrides) {
    if (!ethers.Signer.isSigner(this.provider)) {
      throw new Error('No signer');
    }
    const promises = pools.map(async pool => {
      const staked = await pool.staked(this.provider.getAddress());
      if (staked.gt(0)) {
        return {
          name: pool.name,
          exit: await pool.exit(overrides),
        };
      }
      return null;
    });

    return Promise.all(promises).then(vals => vals.filter(val => typeof val !== 'undefined'));
  }

  /**
   * @param {Object} overrides ethers overrides
   * @return {Array} array of txns
   */
  exitAll(overrides) {
    return this.exitPools(this.pools, overrides);
  }

  /**
   * exit pools that are not returning rewards
   * @param {Object} overrides ethers overrides
   * @return {Array} array of txns
   */
  exitInactive(overrides) {
    return this.exitPools(
      this.pools.filter(pool => !pool.isActive()),
      overrides,
    );
  }

  /**
   * Minimum here is 10**18 = 1 whole coin. So it will be adjusted to `10 ** 18
   * / 10 ** (18 - token.decimals)`.
   * @param minimum the minimum number as 10 ** 18
   * @return {array} array of txns
   */
  stakeUnstaked(minimum, approveForever) {
    if (!ethers.Signer.isSigner(this.provider)) {
      throw new Error('No signer');
    }

    const me = this.provider.getAddress();

    const f = async pool => {
      // 1 extra API call
      const unstaked = await pool.unstakedBalance(me);
      const adjusted = ethers.constants.WeiPerEther.div(pool.lptoken.baseUnit);
      if (unstaked.lt(adjusted)) return null; // respect minimum

      const stakeUnstaked = await pool.approveAndStake(unstaked, approveForever);
      if (!stakeUnstaked) return null;
      return {
        name: pool.name,
        stakeUnstaked,
      };
    };

    return this.pools.map(f).filter(res => !!res);
  }
}

export default {
  data,
  ethers,
  RewardsPool,
  PoolManager,
};
