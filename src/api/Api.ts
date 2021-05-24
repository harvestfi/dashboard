import axios from 'axios'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import BigNumber from 'bignumber.js'

import { IPool, IVault } from '../types/Entities'
import {
  ETHERIUM_CONTRACT_FOR_GETTING_PRICES,
  BSC_URL,
  PRICE_DECIMALS,
} from '@/constants/constants'
import {
  ETH_ORACLE_ABI_FOR_GETTING_PRICES,
  BSC_ORACLE_ABI_FOR_GETTING_PRICES,
  POOL_WITH_EARNED_METHOD_WITH_2_ARGUMENTS,
} from '@/lib/data/ABIs'
import { blockchainAPI } from './blockchainAPI'
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
    let response: IPool[] = []
    try {
      response = await axios.get(
        `${process.env.REACT_APP_ETH_PARSER_URL}/contracts/pools?network=bsc`,
      )
    } catch (error) {
      console.log(
        `An error occurred while receiving BSC vaults. Error: ${error}`,
      )
    }

    return response?.data?.data ?? []
  }

  static async getBSCVaults(): Promise<IVault[]> {
    const response: IVault[] = []
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ETH_PARSER_URL}/contracts/vaults?network=bsc`,
      )
    } catch (error) {
      console.log(
        `An error occurred while receiving BSC vaults. Error: ${error}`,
      )
    }

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
    let price: string

    try {
      price = await gettingPricesContract.methods.getPrice(tokenAddress).call()
    } catch (error) {
      console.log(
        `Something wrong in the "getBSCPrice" method. Token address: ${tokenAddress}. Error ${error}`,
      )
    }

    const prettyPrice = price
      ? new BigNumber(price).dividedBy(10 ** PRICE_DECIMALS)
      : new BigNumber(0)

    return prettyPrice
  }

  static async getExchangeRates(params?: string) {
    const response = await axios.get(
      `https://api.ratesapi.io/api/latest${params ?? ''}`,
    )
    console.log('response', response)
    return response?.data?.rates ?? {}
  }
}
