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
    if (this.token0Asset) {
      return this.token0Asset;
    }
    const address = await this.token0();
    this.token0Asset = getTokenFromAddress(address, this.provider);
    return this.token0Asset;
  }

  /**
   * Get token1
   */
  async getToken1() {
    if (this.token1Asset) {
      return this.token1Asset;
    }
    const address = await this.token1();
    this.token1Asset = getTokenFromAddress(address, this.provider);
    return this.token1Asset;
  }

  /**
   * @return {Array[Token]}
   */
  async currentTokens() {
    return Promise.all([this.getToken0(), this.getToken1()]);
  }
}
