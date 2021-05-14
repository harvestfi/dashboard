import { FetchResource } from './fetch-resource'
import { makeAutoObservable } from 'mobx'
import { API } from '@/api'

class ExchangeRatesStore {
  fetchResource: any

  constructor() {
    makeAutoObservable(this)
    this.fetchResource = new FetchResource(API.getExchangeRates)
  }
}

export const exchangeRatesStore = new ExchangeRatesStore()
