import data from "./data/deploys.js";
import ethers from "ethers";
import { RewardsPool } from "./pool.js";
import { UnderlyingBalances } from "./tokens.js";

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
    return new PoolManager(RewardsPool.weekOne(provider), provider);
  }
  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static weekTwo(provider) {
    return new PoolManager(RewardsPool.weekTwo(provider), provider);
  }
  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static activePools(provider) {
    return new PoolManager(RewardsPool.activePools(provider), provider);
  }
  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static inactivePools(provider) {
    return new PoolManager(RewardsPool.inactivePools(provider), provider);
  }
  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static allPastPools(provider) {
    return new PoolManager(RewardsPool.allPastPools(provider), provider);
  }

  /**
   * @param {Array} pools user address to check balances
   * @param {String} functionPath function to invoke
   * @param {Array} args array of function args
   * @param {String} propName name of prop to put result in
   * @return {Array} results
   */
  static _mapToPools(pools, functionPath, args, propName) {
    const f = async (pool) => {
      const prop = propName ? propName : functionPath[functionPath.length - 1];

      // traverse props iteratively
      let func = pool;
      /* eslint-disable-next-line guard-for-in */
      functionPath.forEach((elem) => {
        func = func[elem];
        if (!func) return;
      });

      if (func) {
        const output = {};
        output.name = pool.name;
        output.address = pool.address;
        output[prop] = await func.apply(pool, [...args]);
        return output;
      }
    };
    return Promise.all(pools.map(f));
  }

  /**
   * @param {string} address user address
   * @return {Array} balances
   */
  staked(address) {
    return PoolManager._mapToPools(
      this.pools,
      ["balanceOf"],
      [address],
      "stakedBalance",
    );
  }

  /**
   * @param {string} address user address
   * @return {Array} balances
   */
  unstaked(address) {
    return PoolManager._mapToPools(
      this.pools,
      ["unstakedBalance"],
      [address],
      "unstakedBalance",
    );
  }

  /**
   * @param {string} address user address
   * @return {Array} rewards
   */
  earned(address) {
    return PoolManager._mapToPools(
      this.pools,
      ["earned"],
      [address],
      "earnedRewards",
    );
  }

  /**
   * @param {string} address user address
   * @return {Array} rewards
   */
  usdValues(address) {
    return PoolManager._mapToPools(
      this.pools,
      ["usdValueOf"],
      [address],
      "usdValue",
    );
  }

  /**
   * @param {string} address user address
   * @return {Array} rewards
   */
  historicalRewards(address) {
    return PoolManager._mapToPools(
      this.pools,
      ["historicalRewards"],
      [address],
      "historicalRewards",
    );
  }

  /**
   * @param {string} address user address
   * @return {BigNumber} total rewards
   */
  usdValueOf(address) {
    return this.usdValues(address).then((rewards) => {
      let total = ethers.BigNumber.from(0);
      rewards.forEach((reward) => {
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
    return PoolManager._mapToPools(
      this.pools,
      ["underlyingBalanceOf"],
      [address, passthrough],
      "underlyingBalances",
    ).then((vs) => vs.filter((v) => !!v));
  }

  /**
   * Return aggregate underlying positions across all pools
   * @param {string} address user address
   * @param {bool} passthrough unwrap interior tokens
   * @return {Array} lp token balances
   */
  aggregateUnderlyings(address) {
    return this.underlying(address, true).then((underlyings) => {
      let aggregateUnderlyings = new UnderlyingBalances();
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
    return PoolManager._mapToPools(
      this.pools,
      ["summary"],
      [address],
      "summary",
    );
  }

  /**
   * @param {BigNumberish} min minimum value to get per-pool. defaults to 10**18
   * @param {Object} overrides ethers overrides
   * @return {Array} array of txns
   */
  getRewards(min, overrides) {
    if (!ethers.Signer.isSigner(this.provider)) {
      throw new Error("No signer");
    }
    overrides = overrides ? overrides : {};

    const address = this.provider.getAddress();
    const lowerBound = min ? min : ethers.constants.WeiPerEther;

    const promises = this.pools.map(async (pool) => {
      if (pool.name !== "FARM Profit Sharing") {
        const earned = await pool.earned(address);

        if (earned.gt(lowerBound)) {
          return {
            name: pool.name,
            getReward: await pool.getReward(overrides),
          };
        }
      }
    });

    return Promise.all(promises).then((vals) => vals.filter((val) => !!val));
  }

  _exitPools(pools, overrides) {
    if (!ethers.Signer.isSigner(this.provider)) {
      throw new Error("No signer");
    }
    const promises = pools.map(async (pool) => {
      const staked = await pool.staked(this.provider.getAddress());
      if (staked.gt(0)) {
        return {
          name: pool.name,
          exit: await pool.exit(overrides),
        };
      }
    });

    return Promise.all(promises).then((vals) =>
      vals.filter((val) => typeof val !== "undefined"),
    );
  }

  /**
   * @param {Object} overrides ethers overrides
   * @return {Array} array of txns
   */
  exitAll(overrides) {
    return this._exitPools(this.pools, overrides);
  }

  /**
   * exit pools that are not returning rewards
   * @param {Object} overrides ethers overrides
   * @return {Array} array of txns
   */
  exitInactive(overrides) {
    return this._exitPools(
      this.pools.filter((pool) => !pool.isActive()),
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
      throw new Error("No signer");
    }

    const me = this.provider.getAddress();

    const f = async (pool) => {
      // 1 extra API call
      const unstaked = await pool.unstakedBalance(me);
      const adjusted = ethers.constants.WeiPerEther.div(pool.lptoken.baseUnit);
      if (unstaked.lt(adjusted)) return; // respect minimum

      const stakeUnstaked = await pool.approveAndStake(
        unstaked,
        approveForever,
      );
      if (!stakeUnstaked) return;
      return {
        name: pool.name,
        stakeUnstaked,
      };
    };

    return this.pools.map(f).filter((res) => !!res);
  }
}

export default {
  data,
  ethers,
  RewardsPool,
  PoolManager,
};
