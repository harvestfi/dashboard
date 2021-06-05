import { FetchResource } from './fetch-resource'
import { convertStandardNumber } from '@/utils/utils'
import { exchangeRatesStore } from './exchange-rates-store'
import { settingsStore } from '@/stores/settings-store'
import { farmAddress } from '@/constants/constants'
import { EthereumService } from '@/services/EthereumService'

class FarmPriceStore extends FetchResource<any> {
  constructor() {
    super(() => EthereumService.getPrice(farmAddress))
    this.fetch()
  }

  getValue() {
    if (this.value === null) {
      return null
    } else {
      return this.value.toNumber()
    }
  }
}

export const farmPriceStore = new FarmPriceStore()
