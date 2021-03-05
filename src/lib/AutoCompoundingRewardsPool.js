import ethers from 'ethers';
import data from './data/deploys';
import { AUTO_REWARDS_ABI } from './data/ABIs';
import RewardsPool from './pool';

export default class AutoCompoundingRewardsPool extends RewardsPool {
  constructor(pool, provider) {
    super(pool, AUTO_REWARDS_ABI, provider);
    this.earnedRewardsAmount = ethers.BigNumber.from(0);
  }

  static farmRewards(provider) {
    return new AutoCompoundingRewardsPool(data.farmRewardsPool, provider);
  }

  async earnedRewards() {
    return this.earnedRewardsAmount;
  }

  async historicalRewards(address) {
    const STAKED_TOPIC0 = '0x6381ea17a5324d29cc015352644672ead5185c1c61a0d3a521eda97e35cec97e';
    const WITHDRAWN_TOPIC0 = '0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5';

    const stakedFilter = this.filters.Staked(address);
    const withdrawnFilter = this.filters.Withdrawn(address);

    let stakedEvents = await this.queryFilter(stakedFilter),
      withdrawnEvents = await this.queryFilter(withdrawnFilter),
      totalStaked = ethers.BigNumber.from(0),
      totalWithdrawn = ethers.BigNumber.from(0);
    const balance = await this.balanceOf(address);

    stakedEvents = stakedEvents.filter(e => e.topics[0] === STAKED_TOPIC0);
    withdrawnEvents = withdrawnEvents.filter(e => e.topics[0] === WITHDRAWN_TOPIC0);

    totalStaked = stakedEvents.reduce(
      (prevValue, currentValue) =>
        currentValue && currentValue.args && currentValue.args[1]
          ? prevValue.add(currentValue.args[1])
          : prevValue,
      totalStaked,
    );
    totalWithdrawn = withdrawnEvents.reduce(
      (prevValue, currentValue) =>
        currentValue && currentValue.args && currentValue.args[1]
          ? prevValue.add(currentValue.args[1])
          : prevValue,
      totalWithdrawn,
    );

    const rewards = balance.add(totalWithdrawn).sub(totalStaked);
    return rewards;
  }
}
