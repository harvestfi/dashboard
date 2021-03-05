import ethers from 'ethers';
import EthParser from '../ethParser';
import ERC20Extended from './ERC20Extended';
/**
 * Token wrapper
 */
export default class Token extends ERC20Extended {
  /**
   *
   * @param {Object} asset object from data/deploy.js
   * @param {Object} abi abi
   * @param {Object} provider web3 provider
   */
  constructor(asset, abi, provider) {
    super(asset.address, asset.decimals, abi, provider);
    this.type = asset.type;
    this.tokenDecimals = asset.decimals;
    this.asset = asset;
  }

  /**
   * Calculate USD value of an amount of tokens
   * @param {BigNumber} amount the amount of tokens to value
   * @return {BigNumber} the value in microdollars
   */
  async usdValueOf(amount) {
    if (amount.isZero()) return ethers.BigNumber.from(0);
    const priceParser = EthParser.parser();
    const value = await priceParser.getPrice(this.address);
    const unit = ethers.BigNumber.from(10).pow(this.tokenDecimals);

    return amount.mul(value).div(unit);
  }
}
