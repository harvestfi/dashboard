import { REWARDS_ABI } from '../lib/data/ABIs'

import { blockchainAPI } from './BlockchainAPI'
import { ethWeb3 } from '@/constants/constants'

const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') })

describe('blockchainAPI', () => {
  describe('makeRequest', () => {
    test('positive scenario', () => {
      const testWallet = '0x814055779f8d2f591277b76c724b7adc74fb82d9'

      const poolContractExample = new ethWeb3.eth.Contract(
        REWARDS_ABI,
        '0x6ac4a7AB91E6fD098E13B7d347c6d4d1494994a2',
      )
      return blockchainAPI
        .makeRequest(poolContractExample, 'balanceOf', testWallet)
        .then((result) => {
          expect(result).toBe('118381239')
        })
    })

    test('scenario when there is no such method in the smart contract', () => {
      const testWallet = '0x814055779f8d2f591277b76c724b7adc74fb82d9'

      const poolContractExample = new ethWeb3.eth.Contract(
        REWARDS_ABI,
        '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      )
      return blockchainAPI
        .makeRequest(poolContractExample, 'factory', testWallet)
        .then((result) => {
          expect(result).toBe(null)
        })
    })

    test('scenario when the smart-contract address doesn`t exist', () => {
      const testWallet = '0x814055779f8d2f591277b76c724b7adc74fb82d9'

      const poolContractExample = new ethWeb3.eth.Contract(
        REWARDS_ABI,
        '0x7caa01b3dc8ee91aa6fa7093e184f045e0da8792',
      )
      return blockchainAPI
        .makeRequest(poolContractExample, 'factory', testWallet)
        .then((result) => {
          expect(result).toBe(null)
        })
    })

    test('scenario when the invalid wallet address', () => {
      const testWallet = '0x814055779f8d2f591277b76c724b7adc'

      const poolContractExample = new ethWeb3.eth.Contract(
        REWARDS_ABI,
        '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      )
      return blockchainAPI
        .makeRequest(poolContractExample, 'factory', testWallet)
        .then((result) => {
          expect(result).toBe(null)
        })
    })
  })
})
