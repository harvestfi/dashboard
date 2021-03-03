import ethers from 'ethers';
import data from './data/deploys';
import { AUTO_REWARDS_ABI, REWARDS_ABI } from './data/ABIs';
import { Token } from './tokens';

export class RewardsPool extends ethers.Contract {
  constructor(pool, abi, provider) {
    super(pool.address, abi, provider);
    this.name = pool.name ? pool.name : pool.asset.name;
    this._pool = pool;

    this.lptoken = Token.fromAsset(pool.asset, provider);
    this.reward = Token.fromAsset(pool.rewardAsset, provider);

    // function aliases
    this.unstakedBalance = this.lptoken.balanceOf;
    this.stakedBalance = this.balanceOf;

    if (this.lptoken.underlyingBalanceOf) {
      this.underlyingBalanceOf = async (address, passthrough) => {
        const balance = await this.balanceOf(address);
        return this.lptoken.calcShare(balance, passthrough);
      };
    }
  }

  getPricePerFullShare() {
    let pricePerShare = null;
    if (this._pool.asset.type === 'ftoken') {
      this.lptoken.getPricePerFullShare().then(res => {
        this.pricePerFullShare = res;
        pricePerShare = ethers.utils.formatUnits(res, this._pool.asset.decimals);
      });
      return pricePerShare;
    }
  }

  static fromPool(pool, provider) {
    switch (pool.type) {
      case 'autocompounding':
        // eslint-disable-next-line no-use-before-define
        return new AutoCompoundingRewardsPool(pool, provider);
      default:
        // eslint-disable-next-line no-use-before-define
        return new HarvestRewardsPool(pool, provider);
    }
  }

  /**
   * @param {Object} provider web3 provider
   * @return {Array} array of RewardsPools
   */
  static knownPools(provider) {
    return data.pools.map(pool => RewardsPool.fromPool(pool, provider));
  }

  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static weekOne(provider) {
    return data.weekOnePools.map(pool => RewardsPool.fromPool(pool, provider));
  }

  static test(provider) {
    return data.testPools.map(pool => RewardsPool.fromPool(pool, provider));
  }

  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static weekTwo(provider) {
    return data.weekTwoPools.map(pool => RewardsPool.fromPool(pool, provider));
  }

  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static activePools(provider) {
    return data.activePools.map(pool => RewardsPool.fromPool(pool, provider));
  }

  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static inactivePools(provider) {
    return data.inactivePools.map(pool => RewardsPool.fromPool(pool, provider));
  }

  /**
   * @param {ethers.Provider} provider provider
   * @return {PoolManager} manager
   */
  static allPastPools(provider) {
    return data.allPastPools.map(pool => RewardsPool.fromPool(pool, provider));
  }

  /**
   * Get the USD value of the staked and unstaked tokens
   * @param {String} address the address
   * @return {String} the percentage, string formatted
   */
  async usdValueOf(address) {
    const [stakedBalance, rewardBalance] = await Promise.all([
      this.stakedBalance(address),
      this.earnedRewards(address),
    ]);

    const [stakedValue, rewardValue] = await Promise.all([
      this.lptoken.usdValueOf(stakedBalance),
      this.reward.usdValueOf(rewardBalance),
    ]);
    return stakedValue.add(rewardValue);
  }

  /**
   * Get the percentage of the supply owned by the address
   * @param {BigNumberish} tokens the address
   * @return {String} the percentage, string formatted
   */
  async percentageOfTotal(tokens) {
    if (tokens.isZero()) return '0%';
    const total = this.totalSupply ? await this.totalSupply() : await this.totalValue();
    if (total.isZero()) return '0%';

    const amnt = tokens.mul(ethers.constants.WeiPerEther).div(total);

    return `${ethers.utils.formatUnits(amnt, 16).slice(0, 5)}%`;
  }

  /**
   * Get the percentage of the supply owned by the address
   * @param {String} address the address
   * @return {String} the percentage, string formatted
   */
  async percentageOwnership(address) {
    return this.percentageOfTotal(await this.balanceOf(address));
  }

  /**
   * @return {bool} isActive
   */
  isActive() {
    return data.isAddressActive(this.address);
  }

  /**
   * Return a summary of the state of the pool
   * @param {String} address the address for which we compute the summary
   * @return {Object} summary
   */
  async summary(address) {
    this.getPricePerFullShare();
    const underlying = async address => {
      if (this.underlyingBalanceOf) {
        return await this.underlyingBalanceOf(address);
      }
      return {};
    };

    const [
      stakedBalance,
      unstakedBalance,
      earnedRewards,
      underlyingBalanceOf,
      percentageOwnership,
      usdValueOf,
      historicalRewards,
    ] = await Promise.all([
      this.stakedBalance(address),
      this.unstakedBalance(address),
      this.earnedRewards(address),
      underlying(address),
      this.percentageOwnership(address),
      this.usdValueOf(address),
      this.historicalRewards(address),
    ]);

    const output = {
      address: this.address,
      user: address,
      pool: this._pool,
      isActive: this.isActive(),
      stakedBalance,
      unstakedBalance,
      earnedRewards,
      percentageOwnership,
      usdValueOf,
      historicalRewards,
      pricePerFullShare: this.pricePerFullShare,
    };
    if (underlyingBalanceOf) output.underlyingBalanceOf = underlyingBalanceOf;
    return output;
  }

  /**
   * @param {Bignumber} amnt 0 or undefined for `all`
   * @param {bool} approveForever approve infinite tokens
   * @return {Optional} `undefined` or a tx receipt
   */
  async approveAndStake(amnt, approveForever) {
    if (!ethers.Signer.isSigner(this.provider)) {
      throw new Error('No signer');
    }

    const me = this.provider.getAddress();

    const [allowance, balance] = await Promise.all([
      this.lptoken.allowances(me, this.address),
      this.lptoken.balanceOf(me),
    ]);

    if (!amnt || amnt.isZero()) amnt = balance;
    if (balance.lt(amnt)) return;

    let approveTx;
    if (approveForever || allowance.lt(balance)) {
      approveTx = this.lptoken.approve(
        this.address,
        approveForever ? ethers.constants.MaxUint256 : amnt,
      );
    }
    const stakeTx = this.stake(amnt);

    await approveTx;
    return await stakeTx;
  }
}

export class AutoCompoundingRewardsPool extends RewardsPool {
  constructor(pool, provider) {
    super(pool, AUTO_REWARDS_ABI, provider);
  }

  static farmRewards(provider) {
    return new AutoCompoundingRewardsPool(data.farmRewardsPool, provider);
  }

  async earnedRewards() {
    return ethers.BigNumber.from(0);
  }

  async historicalRewards(address) {
    const STAKED_TOPIC0 = '0x6381ea17a5324d29cc015352644672ead5185c1c61a0d3a521eda97e35cec97e';
    const WITHDRAWN_TOPIC0 = '0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5';

    const stakedFilter = this.filters.Staked(address);
    const withdrawnFilter = this.filters.Withdrawn(address);

    let [stakedEvents, withdrawnEvents, balance] = await Promise.all([
      this.queryFilter(stakedFilter),
      this.queryFilter(withdrawnFilter),
      this.balanceOf(address),
    ]);

    stakedEvents = stakedEvents.filter(e => e.topics[0] === STAKED_TOPIC0);
    withdrawnEvents = withdrawnEvents.filter(e => e.topics[0] === WITHDRAWN_TOPIC0);

    let totalStaked = new ethers.BigNumber.from(0);
    for (const e of stakedEvents) {
      totalStaked = totalStaked.add(e.args[1]);
    }
    let totalWithdrawn = new ethers.BigNumber.from(0);
    for (const e of withdrawnEvents) {
      totalWithdrawn = totalWithdrawn.add(e.args[1]);
    }

    const rewards = balance.add(totalWithdrawn).sub(totalStaked);
    return rewards;
  }
}

/**
 * Reward pool wrapper
 */
export class HarvestRewardsPool extends RewardsPool {
  /**
   *
   * @param {Object} pool object from data/deploy.js
   * @param {Object} provider web3 provider
   */
  constructor(pool, provider) {
    super(pool, REWARDS_ABI, provider);
    this.earnedRewards = this.earned;
  }

  async historicalRewards(address) {
    const REWARD_PAID_TOPIC0 = '0xe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486';
    const filter = this.filters.RewardPaid(address);
    let [currentRewards, rewardPaidEvents] = await Promise.all([
      this.earnedRewards(address),
      this.queryFilter(filter),
    ]);

    rewardPaidEvents = rewardPaidEvents.filter(e => e.topics[0] === REWARD_PAID_TOPIC0);
    let pastRewards = new ethers.BigNumber.from(0);
    for (const e of rewardPaidEvents) {
      pastRewards = pastRewards.add(e.args[1]);
    }

    return currentRewards.add(pastRewards);
  }
}
