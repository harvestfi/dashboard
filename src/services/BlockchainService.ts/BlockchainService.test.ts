import { BigNumberZero, BSCWeb3, ethWeb3 } from '@/constants'
import { REWARDS_ABI } from '@/lib/data/ABIs'
import BigNumber from 'bignumber.js'
import { BSCService } from '../BSCService'
import { EthereumService } from '../EthereumService'
import { BlockchainService } from './BlockchainService'

const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') })

describe('BlockchainService', () => {
  describe('calcUnderlyingPrice', () => {
    test('if poolBalance > 0 and priceAddress are valid, and getPrice-function for BSC-network, then price is BigNumber', () => {
      const BSCUnderlying = '0xf9045866e7b372def1eff3712ce55fac1a98daf0'
      return BlockchainService.calcUnderlyingPrice(
        '123345345345435353453453',
        BSCUnderlying,
        BSCService.getPriceUsingFactory,
      )
        .then((price: BigNumber | null) => {
          expect(price?.constructor.name === 'BigNumber').toBe(true)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
          expect(true).toBe(false)
        })
    }, 10000)

    test('if poolBalance and priceAddress are valid, and getPrice-function for Ethereum-network, then price is BigNUmber', () => {
      const ethVaultWithPool = '0xc3f7ffb5d5869b3ade9448d094d81b0521e8326f'
      return BlockchainService.calcUnderlyingPrice(
        '123345345345435353453453',
        ethVaultWithPool,
        EthereumService.getPrice,
      )
        .then((price: BigNumber | null) => {
          expect(price?.constructor.name === 'BigNumber').toBe(true)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
          expect(true).toBe(false)
        })
    }, 10000)

    test('if poolBalance is null and priceAddress are valid, then price is null', () => {
      const poolBalance = null
      const ethVaultWithPool = '0xc3f7ffb5d5869b3ade9448d094d81b0521e8326f'

      return BlockchainService.calcUnderlyingPrice(
        poolBalance,
        ethVaultWithPool,
        EthereumService.getPrice,
      )
        .then((price: BigNumber | null) => {
          expect(price).toBe(null)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
          expect(true).toBe(false)
        })
    }, 10000)

    test('if poolBalance is > 0, priceAddress-function for BSC-network, underlying without Factory-metod, then price is BigNumber', () => {
      const poolBalance = '12321321321'
      const BSCUnderlyingWithoutFactory =
        '0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63'

      return BlockchainService.calcUnderlyingPrice(
        poolBalance,
        BSCUnderlyingWithoutFactory,
        BSCService.getPriceUsingFactory,
      )
        .then((price: BigNumber | null) => {
          expect(price.constructor.name).toBe('BigNumber')
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
          expect(true).toBe(false)
        })
    }, 10000)

    test('if poolBalance is null and priceAddress is undefined, then price is null (Ethereum)', () => {
      const poolBalance = null
      const ethVaultWithPool = undefined

      return BlockchainService.calcUnderlyingPrice(
        poolBalance,
        ethVaultWithPool,
        EthereumService.getPrice,
      )
        .then((price: BigNumber | null) => {
          expect(price).toBe(null)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
          expect(true).toBe(false)
        })
    }, 10000)

    test('if poolBalance is null and priceAddress is undefined, then price is null (BSC)', () => {
      const poolBalance = null
      const ethVaultWithPool = undefined

      return BlockchainService.calcUnderlyingPrice(
        poolBalance,
        ethVaultWithPool,
        BSCService.getPriceUsingFactory,
      )
        .then((price: BigNumber | null) => {
          expect(price).toBe(null)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
          expect(true).toBe(false)
        })
    }, 10000)

    test('if poolBalance === 0 and priceAddress are valid, then price is valid', () => {
      const ethVaultWithPool = '0xc3f7ffb5d5869b3ade9448d094d81b0521e8326f'
      return BlockchainService.calcUnderlyingPrice(
        '0',
        ethVaultWithPool,
        EthereumService.getPrice,
      )
        .then((price: BigNumber | null) => {
          expect(price).toBe(BigNumberZero)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
          expect(true).toBe(false)
        })
    }, 10000)
  })

  describe('isValidAddress', () => {
    test('if the address is valid, then returns true', () => {
      const validAddress = '0xb2b4054f50d5feba40af7759f4619f6b68a95520'
      expect(BlockchainService.isValidAddress(validAddress, BSCWeb3)).toBe(true)
    })
    // TODO create method for instances of web3 contract who handles invalid address.
    // Use it where creates instances
    test('if the address is invalid, returns false', () => {
      const invalidAddress = '0xb2b4054f50d5feba40af7759f4619f6b68a955'
      expect(BlockchainService.isValidAddress(invalidAddress, BSCWeb3)).toBe(
        false,
      )
    })
  })

  describe('makeRequest', () => {
    test('positive scenario', () => {
      const testWallet = '0x814055779f8d2f591277b76c724b7adc74fb82d9'

      const poolContractExample = new ethWeb3.eth.Contract(
        REWARDS_ABI,
        '0x6ac4a7AB91E6fD098E13B7d347c6d4d1494994a2',
      )
      return BlockchainService.makeRequest(
        poolContractExample,
        'balanceOf',
        testWallet,
      )
        .then((result: string | null) => {
          expect(result).toBe('118381239')
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
          expect(true).toBe(false)
        })
    }, 10000)

    test('scenario when there is no such method in the smart contract', () => {
      const testWallet = '0x814055779f8d2f591277b76c724b7adc74fb82d9'

      const poolContractExample = new ethWeb3.eth.Contract(
        REWARDS_ABI,
        '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      )
      return BlockchainService.makeRequest(
        poolContractExample,
        'factory',
        testWallet,
      )
        .then((result) => {
          expect(result).toBe(null)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
          expect(true).toBe(false)
        })
    }, 10000)

    test('scenario when the smart-contract address doesn`t exist', () => {
      const testWallet = '0x814055779f8d2f591277b76c724b7adc74fb82d9'

      const poolContractExample = new ethWeb3.eth.Contract(
        REWARDS_ABI,
        '0x7caa01b3dc8ee91aa6fa7093e184f045e0da8792',
      )
      return BlockchainService.makeRequest(
        poolContractExample,
        'factory',
        testWallet,
      )
        .then((result) => {
          expect(result).toBe(null)
        })
        .catch(() => {
          expect(true).toBe(false)
        })
    }, 10000)

    test('scenario when the invalid wallet address', () => {
      const testWallet = '0x814055779f8d2f591277b76c724b7adc'

      const poolContractExample = new ethWeb3.eth.Contract(
        REWARDS_ABI,
        '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      )
      return BlockchainService.makeRequest(
        poolContractExample,
        'factory',
        testWallet,
      )
        .then((result) => {
          expect(result).toBe(null)
        })
        .catch(() => {
          expect(true).toBe(false)
        })
    }, 10000)
  })
})
