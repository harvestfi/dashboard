import axios from 'axios'

import { IPool, IVault } from '../types/Entities'
import { contractForGettingPrices } from '@/constants/constants'
import { Contract, ethers } from 'ethers'
import { PRICE_ORACLE_ABI } from '@/lib/data/ABIs'

interface ITokenPriceResponce {
  data: number
}

export class API {
  static async getPools(): Promise<IPool[]> {
    const response = await axios.get(
      `${process.env.REACT_APP_ETH_PARSER_URL}/contracts/pools`,
    )
    return response ? response.data.data : []
  }

  static async getVaults(): Promise<IVault[]> {
    const response = await axios.get(
      `${process.env.REACT_APP_ETH_PARSER_URL}/contracts/vaults`,
    )
    return response ? response.data.data : []
  }

  static async getAPY(): Promise<number> {
    const response = await axios
      .get(
        `https://api-ui.harvest.finance/pools?key=${process.env.REACT_APP_HARVEST_KEY}`,
      )
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })

    const APY = response ? response.data.eth[0].rewardAPY : 0
    return APY
  }

  static async getPersonalGasSaved(address: string) {
    const response = await axios
      .get(
        `${process.env.REACT_APP_ETH_PARSER_URL}/total_saved_gas_fee_by_address?address=${address}`,
      )
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })

    const savedGas = response ? response.data.data : 0
    return savedGas
  }

  static async getPrice(
    tokenAddress: string,
    provider:
      | ethers.providers.ExternalProvider
      | ethers.providers.JsonRpcFetchFunc,
  ): Promise<number> {
    const ethersProvider = new ethers.providers.Web3Provider(provider)

    const gettingPricesContract = new Contract(
      contractForGettingPrices,
      PRICE_ORACLE_ABI,
      ethersProvider,
    )
    const everyPriceDecimals = 18
    const price = await gettingPricesContract.getPrice(tokenAddress)
    const prettyPrice = price
      ? parseInt(price._hex, 16) / 10 ** everyPriceDecimals
      : 0
    return prettyPrice
  }
}
