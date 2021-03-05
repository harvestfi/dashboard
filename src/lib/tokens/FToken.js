import ethers from 'ethers';
import { FTOKEN_ABI } from '../data/ABIs';
import HasUnderlying from './HasUnderlying';
import UnderlyingBalances from './UnderlyingBalances';
import { getTokenFromAddress } from './tokenUtils';

/**
 * FToken wrapper
 */
export default class FToken extends HasUnderlying {
  constructor(asset, provider) {
    super(asset, FTOKEN_ABI, provider);
    this.underlyingAsset = asset.underlyingAsset;
    this._currentTokens = [getTokenFromAddress(this.underlyingAsset.address, this.provider)];
  }

  async currentTokens() {
    return this._currentTokens;
  }

  async getReserves() {
    return [
      {
        asset: this.underlyingAsset,
        balance: await this.underlyingBalanceWithInvestment(),
      },
    ];
  }

  async calcShare(tokens) {
    if (tokens.isZero()) return new UnderlyingBalances();

    const unit = ethers.BigNumber.from(10).pow(this.underlyingAsset.decimals);
    const balance = tokens.mul(await this.getPricePerFullShare()).div(unit);
    return new UnderlyingBalances().ingest([
      {
        asset: this.underlyingAsset,
        balance,
      },
    ]);
  }
}
