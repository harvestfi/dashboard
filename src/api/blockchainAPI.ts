import { Contract } from 'web3-eth-contract'
import BigNumber from 'bignumber.js'

import {
  PRICE_DECIMALS,
  CONTRACTS_FOR_PRICES,
  CONTRACTS_FOR_PRICES_KEYS,
} from '@/constants/constants'

export class blockchainAPI {
  static async makeRequest(
    contract: Contract,
    methodName: string,
    ...args: any[]
  ): Promise<string | null> {
    try {
      const response: string = await contract.methods[methodName](
        ...args,
      ).call()
      return response
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(
        `An error occurred while calling blockchain method: ${methodName}. Contract address: ${contract?._address}. ${error}`,
      )
      return Promise.resolve(null)
    }
  }

  static async getBSCPrice(
    tokenAddress: string | undefined | null,
    contractsForGettingPrices: CONTRACTS_FOR_PRICES_KEYS,
  ): Promise<BigNumber | null> {
    const gettingPricesContract =
      CONTRACTS_FOR_PRICES[contractsForGettingPrices]

    const price: string | null = await blockchainAPI.makeRequest(
      gettingPricesContract,
      'getPrice',
      tokenAddress,
    )

    const prettyPrice = price
      ? new BigNumber(price).dividedBy(10 ** PRICE_DECIMALS)
      : null

    return prettyPrice
  }
}
