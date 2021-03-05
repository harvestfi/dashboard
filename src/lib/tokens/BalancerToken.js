import { BALANCER_ABI } from '../data/ABIs';
import HasUnderlying from './HasUnderlying';
import { getTokenFromAddress } from './tokenUtils';
/**
 * BalancerToken wrapper
 */
export default class BalancerToken extends HasUnderlying {
  /**
   *
   * @param {Object} asset object from data/deploy.js
   * @param {Object} provider web3 provider
   */
  constructor(asset, provider) {
    super(asset, BALANCER_ABI, provider);
  }

  /**
   * Get current tokens and memoize
   * @return {Array[Token]}
   */
  async currentTokens() {
    if (this._getCurrentTokens) {
      return this._getCurrentTokens;
    }
    const tokens = [];
    (await this.getCurrentTokens()).forEach(token => {
      tokens.push(getTokenFromAddress(token, this.provider));
    });
    this._getCurrentTokens = tokens;
    return this._getCurrentTokens;
  }

  /**
   * Get current tokens and memoize
   * Returns balances keyed by token address.
   */
  async getReserves() {
    const tokens = await this.currentTokens();

    const balances = await Promise.all(
      tokens.map(entry => {
        return entry.balanceOf(this.address);
      }),
    );

    const output = tokens.map((tok, idx) => {
      return {
        asset: tok.asset,
        balance: balances[idx],
      };
    });

    return output;
  }
}
