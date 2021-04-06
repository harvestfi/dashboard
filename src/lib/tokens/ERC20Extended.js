import { ethers } from 'ethers';
import data from '../data/deploys';
/**
 * Extra functions for erc20
 */
export default class ERC20Extended extends ethers.Contract {
  /**
   *
   * @param {Object} address the address of the erc20
   * @param {Object} decimals the erc20 decimals
   * @param {Object} abi abi
   * @param {Object} provider web3 provider
   */
  constructor(address, decimals, abi, provider) {
    if (!provider) {
      throw new Error('Must give a provider');
    }
    super(address, abi, provider);
    this.asset = data.assetByAddress(address);
    this.tokenDecimals = this.asset.decimals;
    this.name = this.asset.name;
    this.baseUnit = ethers.BigNumber.from(10).pow(this.tokenDecimals);
  }

  /**
   * Get the percentage of the supply owned by the address
   * @param {BigNumberish} tokens the address
   * @return {String} the percentage, string formatted
   */
  async percentageOfTotal(tokens) {
    if (tokens.isZero()) return '0%';
    const total = await this.totalSupply();
    if (total.isZero()) return '0%';

    return `${ethers.utils.formatUnits(tokens.mul(100).div(total), 2)}%`;
  }

  /**
   * Get the percentage of the supply owned by the address
   * @param {String} address the address
   * @return {String} the percentage, string formatted
   */
  async percentageOwnership(address) {
    return this.percentageOfTotal(await this.balanceOf(address));
  }
}
