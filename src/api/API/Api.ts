import axios from 'axios'

import { IPool, IVault } from '../../types/entities'

// methods of working with third party api
export class API {
  static async getEthereumPools(): Promise<IPool[]> {
    const response = await axios.get(
      `${process.env.REACT_APP_ETH_PARSER_URL}/contracts/pools`,
    )
    return response?.data?.data ?? []
  }

  static async getEthereumVaults(): Promise<IVault[]> {
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

    return response?.data.data ?? []
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

    return response?.data.data ?? []
  }
}
