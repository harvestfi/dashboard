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
    if (this.currentTokensList) {
      return this.currentTokensList;
    }
    const tokens = [];
    (await this.getCurrentTokens()).forEach(token => {
      tokens.push(getTokenFromAddress(token, this.provider));
    });
    this.currentTokensList = tokens;
    return this.currentTokensList;
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
