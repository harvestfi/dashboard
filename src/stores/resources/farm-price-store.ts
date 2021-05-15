import { FetchResource } from './fetch-resource'
import { API } from '@/api'
import { convertStandardNumber } from '@/utils/utils'
import { exchangeRatesStore } from './exchange-rates-store'
import { settingsStore } from '@/stores/settings-store'

class FarmPriceStore extends FetchResource<any> {
  constructor() {
    super(API.getEtheriumPrice)
  }

  getValue() {
    if (this.value === null) {
      return 0
    }

    const currency = settingsStore.settings.currency.value
    const currentExchangeRate = exchangeRatesStore.value[currency]

    return convertStandardNumber(
      this.value.toNumber() * currentExchangeRate,
      currency,
    )
  }
}

export const farmPriceStore = new FarmPriceStore()
