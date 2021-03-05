import ethers from 'ethers';
import { formatUnits } from 'ethers/lib/utils';

/**
 * Prettifies money
 * @param {Number} USD value in microdollars
 * @return {String} pretty
 */
export function prettyMoney(microdollars) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(microdollars / 1000000);
}

/**
 * Prettifies a positions for console.table
 * @param {Object} sum position summary
 * @return {Object} pretty
 */
export function prettyPosition(sum) {
  const {
    name,
    summary: {
      pool: {
        asset: { decimals },
      },
      address,
      isActive,
      stakedBalance,
      unstakedBalance,
      earnedRewards,
      percentageOwnership,
      usdValueOf,
      historicalRewards,
      underlyingBalanceOf,
      pool,
      pricePerFullShare,
    },
  } = sum;

  const formattedUnderlyingBalance = (function format() {
    if (underlyingBalanceOf) {
      if (underlyingBalanceOf.balances) {
        const underlyingKey = Object.keys(underlyingBalanceOf.balances)[0];
        return formatUnits(underlyingBalanceOf.balances[underlyingKey], decimals);
      }
    }
    return 0;
  })();

  function formatProfits() {
    if (pricePerFullShare) {
      const sharePrice = formatUnits(pricePerFullShare, decimals);
      const underlyingPricedifference =
        sharePrice * formattedUnderlyingBalance - formattedUnderlyingBalance;
      const usdValuePerShare = formatUnits(usdValueOf.toNumber(), 6) / formattedUnderlyingBalance;

      return underlyingPricedifference * usdValuePerShare;
    }
    return 0;
  }

  const truncatedClaimable = earnedRewards.div(10 ** 10);
  const truncatedRewards = historicalRewards.div(10 ** 10);

  return {
    name,
    isActive,
    address,
    stakedBalance: ethers.utils.formatUnits(stakedBalance, decimals),
    unstakedBalance: ethers.utils.formatUnits(unstakedBalance, decimals),
    earnedRewards: ethers.utils.formatUnits(truncatedClaimable, 8),
    percentOfPool: percentageOwnership,
    usdValueOf,
    historicalRewards: ethers.utils.formatUnits(truncatedRewards, 8),
    underlyingBalance: formattedUnderlyingBalance,
    pool,
    profits: formatProfits(),
  };
}

/**
 * Prettifies a positions for console.table
 * @param {Object} u
 * @return {Object} pretty
 */
export function prettyUnderlying(u) {
  const underlyingBalancesList = u.underlyingBalances.toList();

  if (underlyingBalancesList[0].balance.isZero()) {
    return {};
  }

  /**
   * @param {Object} underlying output of underlyingBalanceOf
   * @return {Object} transformed
   */
  function transformUnderlying(underlying) {
    const { name, decimals } = underlying.asset;
    return {
      name,
      balance: ethers.utils.formatUnits(underlying.balance, decimals),
    };
  }

  return {
    asset: u.name,
    underlyingBalances: underlyingBalancesList.map(transformUnderlying),
  };
}

export const prettyEthAddress = address => {
  if (address && address.length === 42) {
    address = `${address.substring(0, 6)}...${address.substring(42, 38)}`;
  }
  return address;
};

export default {
  prettyUnderlying,
  prettyPosition,
  prettyMoney,
};
