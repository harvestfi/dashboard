import { FetchResource } from './fetch-resource'
import { makeAutoObservable } from 'mobx'

class ExchangeRates {
  fetchResource: any

  constructor() {
    makeAutoObservable(this)
    this.fetchResource = new FetchResource(
      'https://api.ratesapi.io/api/latest',
      ['data', 'rates'],
    )
  }
}

export const exchangeRates = new ExchangeRates()
