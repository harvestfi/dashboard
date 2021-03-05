import { UNISWAP_PAIR_ABI } from '../data/ABIs';
import HasUnderlying from './HasUnderlying';
import { getTokenFromAddress } from './tokenUtils';

/**
 * UniswapToken wrapper
 */
export default class UniswapToken extends HasUnderlying {
  /**
   *
   * @param {Object} asset object from data/deploy.js
   * @param {Object} provider web3 provider
   */
  constructor(asset, provider) {
    super(asset, UNISWAP_PAIR_ABI, provider);

    this.reserve0 = async () => {
      const reserveRes = await this.getReserves()[0];
      return reserveRes;
    };
    this.reserve1 = async () => {
      const reserveRes = await this.getReserves()[1];
      return reserveRes;
    };
  }

  /**
   * Get token0
   */
  async getToken0() {
    if (this._token0) {
      return this._token0;
    }
    const address = await this.token0();
    this._token0 = getTokenFromAddress(address, this.provider);
    return this._token0;
  }

  /**
   * Get token1
   */
  async getToken1() {
    if (this._token1) {
      return this._token1;
    }
    const address = await this.token1();
    this._token1 = getTokenFromAddress(address, this.provider);
    return this._token1;
  }

  /**
   * @return {Array[Token]}
   */
  async currentTokens() {
    return Promise.all([this.getToken0(), this.getToken1()]);
  }
}
