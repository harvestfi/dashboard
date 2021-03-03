import ethers from 'ethers';
import { ERC20_ABI, UNISWAP_PAIR_ABI, BALANCER_ABI, CURVE_ABI, FTOKEN_ABI } from './data/ABIs.js';
import data from './data/deploys.js';
import EthParser from './ethParser.js';

/**
 * UnderlyingBalances
 */
export class UnderlyingBalances {
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
      const asset = Token.fromName(name, provider);
      return asset.usdValueOf(balance);
    });
    return Promise.all(promises).then(vals => {
      let total = ethers.BigNumber.from(0);
      vals.forEach(val => (total = total.add(val)));
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

/**
 * Extra functions for erc20
 */
export class ERC20Extended extends ethers.Contract {
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
    this.baseUnit = new ethers.BigNumber.from(10).pow(this.tokenDecimals);
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
/**
 * Token wrapper
 */
export class Token extends ERC20Extended {
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

  /**
   *
   * @param {Object} asset object from data/deploy.js
   * @param {Object} provider web3 provider
   * @return {Token} an Token subclass instances
   */
  static fromAsset(asset, provider) {
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
  }

  /**
   *
   * @param {Object} address
   * @param {Object} provider web3 provider
   * @return {Token} an Token subclass instances
   */
  static fromAddress(address, provider) {
    return Token.fromAsset(data.assetByAddress(address), provider);
  }

  /**
   *
   * @param {Object} name
   * @param {Object} provider web3 provider
   * @return {Token} an Token subclass instances
   */
  static fromName(name, provider) {
    return Token.fromAsset(data.assetByName(name), provider);
  }
}

class HasUnderlying extends Token {
  async currentTokens() {
    throw Error('currentTokens is abstract, and must be implemented on a subclass');
  }

  /**
   * Returns balances keyed by token address.
   */
  async getReserves() {
    const tokens = await this.currentTokens();

    const balances = await Promise.all(tokens.map(tok => tok.balanceOf(this.address)));

    const output = balances.map((balance, idx) => {
      return {
        asset: tokens[idx].asset,
        balance,
      };
    });

    return output;
  }

  /**
   * Get the underlying balance of tokens given N LP shares
   * @param {BigNumberish} tokens the number of LP tokens
   * @param {bool} passthrough pass through to the lowest assets.
   */
  async calcShare(tokens, passthrough) {
    if (tokens.isZero()) return new UnderlyingBalances();
    const [total, reserves] = await Promise.all([this.totalSupply(), this.getReserves()]);
    if (total.isZero()) return new UnderlyingBalances();

    const shares = new UnderlyingBalances();

    for (const reserve of reserves) {
      const balance = reserve.balance.mul(tokens).div(total);
      if (reserve.asset.type && passthrough) {
        const token = Token.fromAsset(reserve.asset, this.provider);
        shares.combine(await token.calcShare(balance, passthrough));
      } else {
        shares.ingest([
          {
            asset: reserve.asset,
            balance,
          },
        ]);
      }
    }

    return shares;
  }

  /**
   * Get the underlying balance of tokens
   * @param {String} address the address
   * @param {bool} passthrough pass through to the lowest assets.
   */
  async underlyingBalanceOf(address, passthrough) {
    const balance = await this.balanceOf(address);
    return this.calcShare(balance, passthrough);
  }

  /**
   * Calculate USD value of an amount of tokens
   * @param {BigNumber} amount the amount of tokens to value
   * @return {BigNumber} the value in microdollars
   */
  async usdValueOf(amount) {
    if (amount.isZero()) return ethers.BigNumber.from(0);
    const shares = await this.calcShare(amount, true);
    return await shares.usdValueOf(this.provider);
  }
}

/**
 * FToken wrapper
 */
export class FToken extends HasUnderlying {
  constructor(asset, provider) {
    super(asset, FTOKEN_ABI, provider);
    this.underlyingAsset = asset.underlyingAsset;
    this._currentTokens = [Token.fromAddress(this.underlyingAsset.address, this.provider)];
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

/**
 * UniswapToken wrapper
 */
export class UniswapToken extends HasUnderlying {
  /**
   *
   * @param {Object} asset object from data/deploy.js
   * @param {Object} provider web3 provider
   */
  constructor(asset, provider) {
    super(asset, UNISWAP_PAIR_ABI, provider);

    this.reserve0 = async () => await this.getReserves()[0];
    this.reserve1 = async () => await this.getReserves()[1];
  }

  /**
   * Get token0
   */
  async getToken0() {
    if (this._token0) {
      return this._token0;
    }
    const address = await this.token0();
    this._token0 = Token.fromAddress(address, this.provider);
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
    this._token1 = Token.fromAddress(address, this.provider);
    return this._token1;
  }

  /**
   * @return {Array[Token]}
   */
  async currentTokens() {
    return Promise.all([this.getToken0(), this.getToken1()]);
  }
}

/**
 * CurveToken wrapper
 */
export class CurveToken extends HasUnderlying {
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
    if (this._getCurrentTokens) {
      return this._getCurrentTokens;
    }
    this._getCurrentTokens = this.curveInfo.assets.map(asset => {
      return Token.fromAddress(asset.address, this.provider);
    });
    return this._getCurrentTokens;
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

/**
 * BalancerToken wrapper
 */
export class BalancerToken extends HasUnderlying {
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
      tokens.push(Token.fromAddress(token, this.provider));
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
