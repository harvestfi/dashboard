import axios from 'axios';
import { ethers } from 'ethers';

class EthParserApi {
  /**
   * @param {String} url the api url
   */
  constructor(url) {
    this.url = url;
    this.memos = {};
  }

  /**
   * @param {String} address token address
   * @param {Number} time current time
   * @return {Number} price
   */
  checkMemo(address, time) {
    const key = address.toLowerCase();
    if (this.memos[key] && this.memos[key].validUntil >= time) {
      return this.memos[key].bnPrice;
    }
    return 0;
  }

  /**
   * @param {String} address token address
   * @param {Number} price price in USD
   * @param {Number} validUntil validity of memoization
   * @return {ethers.BigNumber} price in microdollars
   */
  memoize(address, price, validUntil) {
    if (!price) return ethers.BigNumber.from(0);
    const key = address.toLowerCase();
    const bnPrice = ethers.BigNumber.from(parseInt(price * 1000000, 10));
    this.memos[key] = {
      validUntil,
      bnPrice,
    };
    return bnPrice;
  }

  /**
   * NOTE: silently fails to return unknown or non-existing assets
   * @param {Array} addresses token addresses
   */
  async getPrices(addresses) {
    const result = {};
    const time = Date.now();

    addresses.forEach(address => {
      const memo = this.checkMemo(address.toLowerCase(), time);
      if (memo) {
        result[address.toLowerCase()] = memo;
      }
    });

    const s = addresses
      .filter(address => !result[address.toLowerCase()])
      .map(address => address.toLowerCase())
      .join(',');

    if (s) {
      const url = `${this.url}/price/token/${s}`;
      const response = await axios.get(url);

      const usd = parseFloat(response.data.data);

      result[s.toLowerCase()] = this.memoize(s, usd, time + 5 * 60 * 1000);

      // account for unknown addresses that return nothing
      const unknown = addresses
        .filter(address => !result[address.toLowerCase()])
        .map(address => address.toLowerCase());
      unknown.forEach(address => {
        result[address] = this.memoize(address, '0x0', time + 5 * 60 * 1000);
      });
    }

    return result;
  }

  /**
   * @param {String} address token address
   * @return {Promise} price in microdollars
   */
  getPrice(address) {
    return this.getPrices([address]).then(res => {
      return res[address.toLowerCase()];
    });
  }
}

const EthParser = (function ethParser() {
  const instances = {};

  function createInstance(url) {
    const object = new EthParserApi(url);
    return object;
  }

  function fromUrl() {
    const url = process.env.REACT_APP_ETH_PARSER_URL;
    if (!instances[url]) {
      instances[url] = createInstance(url);
    }
    return instances[url];
  }

  function parser() {
    return fromUrl();
  }

  return {
    parser,
    fromUrl,
  };
})();

export default EthParser;
