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
    // TODO fix exchangeRatesStore
    // if (this.value === null || exchangeRatesStore.value === null) {
    if (this.value === null) {
      return null
    }

    // const currency = settingsStore.settings.currency.value
    // const currentExchangeRate = exchangeRatesStore.value[currency]

    return convertStandardNumber(
      // this.value.toNumber() * currentExchangeRate,
      // currency,
      this.value.toNumber(),
      'USD',
    )
  }
}

export const farmPriceStore = new FarmPriceStore()
