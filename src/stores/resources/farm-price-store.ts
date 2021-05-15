import { FetchResource } from './fetch-resource'
import { API } from '@/api'
import { convertStandardNumber } from '@/utils/utils'
import { exchangeRatesStore } from './exchange-rates-store'
import { settingsStore } from '@/stores/settings-store'
import { observable } from 'mobx'

class FarmPriceStore extends FetchResource<any> {
  @observable
  private readonly settingsStore = settingsStore

  @observable
  private readonly exchangeRatesStore = exchangeRatesStore

  constructor() {
    super(API.getEtheriumPrice)
  }

  getValue() {
    const currency = this.settingsStore.settings.currency.value
    const currentExchangeRate = this.exchangeRatesStore.value[currency]

    return convertStandardNumber(
      this.value.toNumber() * currentExchangeRate,
      currency,
    )
  }
}

export const farmPriceStore = new FarmPriceStore()
