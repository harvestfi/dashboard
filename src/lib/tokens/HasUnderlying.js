import { ethers } from 'ethers';
import Token from './Token';
import UnderlyingBalances from './UnderlyingBalances';
import { getTokenFromAsset } from './tokenUtils';

export default class HasUnderlying extends Token {
  static async currentTokens() {
    throw Error('currentTokens is abstract, and must be implemented on a subclass');
  }

  /**
   * Returns balances keyed by token address.
   */
  async getReserves() {
    const tokens = await this.currentTokens();

    const balances = await Promise.all(tokens.map(tok => tok.balanceOf(this.address)));

    const output = balances.map((balance, idx) => {
      return {
        asset: tokens[idx].asset,
        balance,
      };
    });

    return output;
  }

  /**
   * Get the underlying balance of tokens given N LP shares
   * @param {BigNumberish} tokens the number of LP tokens
   * @param {bool} passthrough pass through to the lowest assets.
   */
  async calcShare(tokens, passthrough) {
    if (tokens.isZero()) return new UnderlyingBalances();
    const [total, reserves] = await Promise.all([this.totalSupply(), this.getReserves()]);
    if (total.isZero()) return new UnderlyingBalances();

    const shares = new UnderlyingBalances();

    reserves.forEach(async reserve => {
      const balance = reserve.balance.mul(tokens).div(total);
      if (reserve.asset.type && passthrough) {
        const token = getTokenFromAsset(reserve.asset, this.provider);
        // eslint-disable-next-line no-await-in-loop
        shares.combine(await token.calcShare(balance, passthrough));
      } else {
        shares.ingest([
          {
            asset: reserve.asset,
            balance,
          },
        ]);
      }
    });
    return shares;
  }

  /**
   * Get the underlying balance of tokens
   * @param {String} address the address
   * @param {bool} passthrough pass through to the lowest assets.
   */
  async underlyingBalanceOf(address, passthrough) {
    const balance = await this.balanceOf(address);
    return this.calcShare(balance, passthrough);
  }

  /**
   * Calculate USD value of an amount of tokens
   * @param {BigNumber} amount the amount of tokens to value
   * @return {BigNumber} the value in microdollars
   */
  async usdValueOf(amount) {
    if (amount.isZero()) return ethers.BigNumber.from(0);
    const shares = await this.calcShare(amount, true);
    const sharesUsdValue = await shares.usdValueOf(this.provider);
    return sharesUsdValue;
  }
}
