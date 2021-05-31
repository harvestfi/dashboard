import BigNumber from 'bignumber.js'
import Web3 from 'web3'

import { BigNumberZero } from '@/constants'

// common methods for working with blockchain
export class BlockchainService {
  static async calcUnderlyingPrice(
    poolBalance: string | null,
    priceAddress: string | undefined,
    getPrice: (priceAddress: string | undefined) => Promise<BigNumber | null>,
  ): Promise<BigNumber | null> {
    if (!poolBalance) {
      return null
    }

    if (poolBalance === '0') {
      return BigNumberZero
    }
    return await getPrice(priceAddress)
  }

  static isValidAddress(address: any, web3: Web3): boolean {
    const isValid: boolean = web3.utils.isAddress(String(address))
    if (!isValid) {
      console.log(`address ${address} is not valid`)
    }
    return isValid
  }
}
