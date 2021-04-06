import { ethers } from 'ethers';
import { REWARDS_ABI } from './data/ABIs';
import RewardsPool from './pool';
/**
 * Reward pool wrapper
 */
export default class HarvestRewardsPool extends RewardsPool {
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

    const currentRewards = await this.earnedRewards(address);
    let rewardPaidEvents = await this.queryFilter(filter),
      pastRewards = ethers.BigNumber.from(0);

    rewardPaidEvents = rewardPaidEvents.filter(e => e.topics[0] === REWARD_PAID_TOPIC0);
    pastRewards = rewardPaidEvents.reduce(
      (prevValue, currentValue) =>
        currentValue && currentValue.args && currentValue.args[1]
          ? prevValue.add(currentValue.args[1])
          : prevValue,
      pastRewards,
    );

    return currentRewards.add(pastRewards);
  }
}
