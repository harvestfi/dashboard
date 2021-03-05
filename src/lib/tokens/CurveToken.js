import { CURVE_ABI } from '../data/ABIs';
import HasUnderlying from './HasUnderlying';
import { getTokenFromAddress } from './tokenUtils';
/**
 * CurveToken wrapper
 */
export default class CurveToken extends HasUnderlying {
  /**
   *
   * @param {Object} asset object from data/deploy.js
   * @param {Object} provider web3 provider
   */
  constructor(asset, provider) {
    super(asset, CURVE_ABI, provider);
    this.curveInfo = asset.curveInfo;
  }

  /**
   * Get current tokens and memoize
   * @return {Array[Token]}
   */
  async currentTokens() {
    if (this.currentTokensList) {
      return this.currentTokensList;
    }
    this.currentTokensList = this.curveInfo.assets.map(asset => {
      return getTokenFromAddress(asset.address, this.provider);
    });
    return this.currentTokensList;
  }

  /**
   * Returns balances keyed by token address.
   */
  async getReserves() {
    const tokens = await this.currentTokens();

    const balances = await Promise.all(
      tokens.map(tok => tok.balanceOf(this.curveInfo.poolAddress)),
    );

    const output = balances.map((balance, idx) => {
      return {
        asset: tokens[idx].asset,
        balance,
      };
    });
    return output;
  }
}
