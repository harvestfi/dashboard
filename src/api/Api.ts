import {
  bscOutdatedPools,
  bscOutdatedVaults,
  ethereumOutdatedPools,
  ethereumOutdatedVaults,
  iPSAddress,
} from '@/constants'
import axios from 'axios'

import { IPool, IVault } from '../types/entities'

// methods of working with third party api
export class API {
  static async getEthereumPools(): Promise<IPool[]> {
    const response = await axios
      .get<{ data: IPool[] }>(
        `${process.env.REACT_APP_ETH_PARSER_URL}/contracts/pools`,
      )
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('getEthereumPools', error)
      })
    return (
      response?.data?.data.filter((pool) => {
        return !ethereumOutdatedPools.has(pool.contract.address.toLowerCase())
      }) ?? []
    )
  }

  static async getEthereumVaults(): Promise<IVault[]> {
    const response = await axios
      .get<{ data: IVault[] }>(
        `${process.env.REACT_APP_ETH_PARSER_URL}/contracts/vaults`,
      )
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('getEthereumVaults', error)
      })

    // eslint-disable-next-line no-unused-expressions
    response?.data?.data.push(iPSAddress)

    return (
      response?.data?.data.filter((vault) => {
        return !ethereumOutdatedVaults.has(vault.contract.address.toLowerCase())
      }) ?? []
    )
  }

  static async getAPY(): Promise<string | null> {
    const response = await axios.get(
      `https://api-ui.harvest.finance/pools?key=${process.env.REACT_APP_HARVEST_KEY}`,
    )

    const APY = response?.data?.eth[0].rewardAPY ?? null
    return APY
  }

  static async getPersonalGasSaved(address: string): Promise<null | number> {
    const response = await axios.get(
      `${process.env.REACT_APP_ETH_PARSER_URL}/total_saved_gas_fee_by_address?address=${address}`,
    )

    const savedGas = response?.data?.data ?? null

    return savedGas
  }

  static async getBSCPools(): Promise<IPool[]> {
    let response
    try {
      response = await axios.get<{ data: IPool[] }>(
        `${process.env.REACT_APP_ETH_PARSER_URL}/contracts/pools?network=bsc`,
      )
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(
        `An error occurred while receiving BSC vaults. Error: ${error}`,
      )
    }

    return (
      response?.data.data.filter((vault) => {
        return !bscOutdatedPools.has(vault.contract.address.toLowerCase())
      }) ?? []
    )
  }

  static async getBSCVaults(): Promise<IVault[]> {
    let response
    try {
      response = await axios.get<{ data: IVault[] }>(
        `${process.env.REACT_APP_ETH_PARSER_URL}/contracts/vaults?network=bsc`,
      )
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(
        `An error occurred while receiving BSC vaults. Error: ${error}`,
      )
    }

    return (
      response?.data.data.filter((vault) => {
        return !bscOutdatedVaults.has(vault.contract.address.toLowerCase())
      }) ?? []
    )
  }

  static async getExchangeRates() {
    let response

    try {
      response = await axios.get(
        `https://api.zapper.fi/v1/fiat-rates?api_key=${process.env.ZAPPER_API_KEY}`,
      )
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(
        `An error occurred while getting exchange rates from Zapper: ${error}`,
      )
    }

    const responseData = response?.data

    // basic sanity checking on Zapper's API response...
    if (responseData && responseData.USD) return responseData
  }
}
