import ethers from 'ethers';
import data from './data/deploys';
import { getTokenFromAsset } from './tokens';

export default class RewardsPool extends ethers.Contract {
  constructor(pool, abi, provider) {
    super(pool.address, abi, provider);
    this.name = pool.name ? pool.name : pool.asset.name;
    this.pool = pool;

    this.lptoken = getTokenFromAsset(pool.asset, provider);
    this.reward = getTokenFromAsset(pool.rewardAsset, provider);

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
    if (this.pool.asset.type === 'ftoken') {
      this.lptoken.getPricePerFullShare().then(res => {
        this.pricePerFullShare = res;
        pricePerShare = ethers.utils.formatUnits(res, this.pool.asset.decimals);
      }).catch(err => {
        if (err.code !== -32603) {
          console.log(err);
        }
      });
      return pricePerShare;
    }
    return '0';
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
    const underlying = async _address => {
      if (this.underlyingBalanceOf) {
        const underlyingBalanceOfRes = await this.underlyingBalanceOf(_address);
        return underlyingBalanceOfRes;
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
      pool: this.pool,
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
    if (balance.lt(amnt)) return null;

    let approveTx;
    if (approveForever || allowance.lt(balance)) {
      approveTx = this.lptoken.approve(
        this.address,
        approveForever ? ethers.constants.MaxUint256 : amnt,
      );
    }
    const stakeTx = this.stake(amnt);

    await approveTx;
    const stakeRes = await stakeTx;
    return stakeRes;
  }
}
