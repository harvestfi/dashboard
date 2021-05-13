import axios from 'axios'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'

import { IPool, IVault } from '../types/Entities'
import {
  ETHERIUM_CONTRACT_FOR_GETTING_PRICES,
  BSC_URL,
  PRICE_DECIMALS,
  ETH_URL,
} from '@/constants/constants'
import {
  ETH_ORACLE_ABI_FOR_GETTING_PRICES,
  BSC_ORACLE_ABI_FOR_GETTING_PRICES,
} from '@/lib/data/ABIs'
export class API {
  static async getPools(): Promise<IPool[]> {
    const response = await axios.get(
      `${process.env.REACT_APP_ETH_PARSER_URL}/contracts/pools`,
    )
    return response?.data?.data ?? []
  }

  static async getVaults(): Promise<IVault[]> {
    const response = await axios.get(
      `${process.env.REACT_APP_ETH_PARSER_URL}/contracts/vaults`,
    )
    return response?.data?.data ?? []
  }

  static async getAPY(): Promise<string | null> {
    const response = await axios.get(
      `https://api-ui.harvest.finance/pools?key=${process.env.REACT_APP_HARVEST_KEY}`,
    )

    const APY = response?.data?.eth[0].rewardAPY ?? null
    return APY
  }

  static async getPersonalGasSaved(address: string) {
    const response = await axios.get(
      `${process.env.REACT_APP_ETH_PARSER_URL}/total_saved_gas_fee_by_address?address=${address}`,
    )

    const savedGas = response?.data?.data ?? 0
    return savedGas
  }

  static async getEtheriumPrice(tokenAddress: string): Promise<BigNumber> {
    const web3 = new Web3(process.env.REACT_APP_ETH_URL!)

    const gettingPricesContract = new web3.eth.Contract(
      ETH_ORACLE_ABI_FOR_GETTING_PRICES,
      ETHERIUM_CONTRACT_FOR_GETTING_PRICES,
    )

    const price: string = await gettingPricesContract.methods
      .getPrice(tokenAddress)
      .call()

    const prettyPrice = price
      ? new BigNumber(price).dividedBy(10 ** PRICE_DECIMALS)
      : new BigNumber(0)
    return prettyPrice
  }

  static async getBSCPools(): Promise<IPool[]> {
    const response = await axios.get(
      // TODO change to `${process.env.REACT_APP_ETH_PARSER_URL}/contracts/pools?network=bsc`, when ready
      `${process.env.REACT_APP_ETH_PARSER_URL}/contracts/pools?network=bsc`,
    )
    return response?.data?.data ?? []
  }

  static async getBSCVaults(): Promise<IVault[]> {
    const response = await axios.get(
      // TODO change to `${process.env.REACT_APP_ETH_PARSER_URL}/contracts/vaults?network=bsc`, when ready
      `${process.env.REACT_APP_ETH_PARSER_URL}/contracts/vaults?network=bsc`,
    )
    return response?.data?.data ?? []
  }

  static async getBSCPrice(
    tokenAddress: string,
    oracleAddressForGettingPrices: string,
  ): Promise<BigNumber> {
    const web3 = new Web3(BSC_URL)

    const gettingPricesContract = new web3.eth.Contract(
      BSC_ORACLE_ABI_FOR_GETTING_PRICES,
      oracleAddressForGettingPrices,
    )

    const price: string = await gettingPricesContract.methods
      .getPrice(tokenAddress)
      .call()

    const prettyPrice = price
      ? new BigNumber(price).dividedBy(10 ** PRICE_DECIMALS)
      : new BigNumber(0)
    return prettyPrice
  }
}
