import ethers from 'ethers';
import data from '../data/deploys';
import { getTokenFromName } from './tokenUtils';

/**
 * UnderlyingBalances
 */
export default class UnderlyingBalances {
  constructor() {
    this.balances = {};
  }

  _ingest(name, balance) {
    if (balance.isZero()) return;
    if (!this.balances[name]) {
      this.balances[name] = balance;
    } else {
      this.balances[name] = this.balances[name].add(balance);
    }
  }

  usdValueOf(provider) {
    const promises = Object.entries(this.balances).map(([name, balance]) => {
      const asset = getTokenFromName(name, provider);
      return asset.usdValueOf(balance);
    });
    return Promise.all(promises).then(vals => {
      let total = ethers.BigNumber.from(0);
      total = vals.reduce((previousValue, currentValue) => previousValue.add(currentValue));
      return total;
    });
  }

  ingest(entries) {
    entries.forEach(entry => this._ingest(entry.asset.name, entry.balance));
    return this;
  }

  combine(other) {
    if (other)
      Object.entries(other.balances).forEach(([name, balance]) => this._ingest(name, balance));
    return this;
  }

  toList() {
    return Object.entries(this.balances).map(([name, balance]) => {
      return {
        asset: data.assetByName(name),
        balance,
      };
    });
  }
}
