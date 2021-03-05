import data from './data/deploys';
import AutoCompoundingRewardsPool from './AutoCompoundingRewardsPool';
import HarvestRewardsPool from './HarvestRewardsPool';

export const getRewardsPool = (pool, provider) => {
  switch (pool.type) {
    case 'autocompounding':
      return new AutoCompoundingRewardsPool(pool, provider);
    default:
      return new HarvestRewardsPool(pool, provider);
  }
};

export function knownPools(provider) {
  return data.pools.map(pool => getRewardsPool(pool, provider));
}

/**
 * @param {ethers.Provider} provider provider
 * @return {PoolManager} manager
 */
export function weekOne(provider) {
  return data.weekOnePools.map(pool => getRewardsPool(pool, provider));
}

export function test(provider) {
  return data.testPools.map(pool => getRewardsPool(pool, provider));
}

/**
 * @param {ethers.Provider} provider provider
 * @return {PoolManager} manager
 */
export function weekTwo(provider) {
  return data.weekTwoPools.map(pool => getRewardsPool(pool, provider));
}

/**
 * @param {ethers.Provider} provider provider
 * @return {PoolManager} manager
 */
export function activePools(provider) {
  return data.activePools.map(pool => getRewardsPool(pool, provider));
}

/**
 * @param {ethers.Provider} provider provider
 * @return {PoolManager} manager
 */
export function inactivePools(provider) {
  return data.inactivePools.map(pool => getRewardsPool(pool, provider));
}

/**
 * @param {ethers.Provider} provider provider
 * @return {PoolManager} manager
 */
export function allPastPools(provider) {
  return data.allPastPools.map(pool => getRewardsPool(pool, provider));
}
