import { FetchResource } from './fetch-resource'
import { API } from '@/api'

class ExchangeRatesStore extends FetchResource<any> {
  constructor() {
    super(API.getExchangeRates)
  }
}

export const exchangeRatesStore = new ExchangeRatesStore()
