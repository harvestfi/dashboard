import { BalancerToken, UniswapToken, CurveToken, FToken, Token } from './index';
import { ERC20_ABI } from '../data/ABIs';
import data from '../data/deploys';

/**
 *
 * @param {Object} asset object from data/deploy.js
 * @param {Object} provider web3 provider
 * @return {Token} an Token subclass instances
 */
export const getTokenFromAsset = (asset, provider) => {
  switch (asset.type) {
    case 'balancer':
      return new BalancerToken(asset, provider);
    case 'uniswap':
      return new UniswapToken(asset, provider);
    case 'curve':
      return new CurveToken(asset, provider);
    case 'ftoken':
      return new FToken(asset, provider);
    default:
      return new Token(asset, ERC20_ABI, provider);
  }
};

/**
 *
 * @param {Object} address
 * @param {Object} provider web3 provider
 * @return {Token} an Token subclass instances
 */
export const getTokenFromAddress = (address, provider) => {
  return getTokenFromAsset(data.assetByAddress(address), provider);
};

/**
 *
 * @param {Object} name
 * @param {Object} provider web3 provider
 * @return {Token} an Token subclass instances
 */
export const getTokenFromName = (name, provider) => {
  return getTokenFromAsset(data.assetByName(name), provider);
};
