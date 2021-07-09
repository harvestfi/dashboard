import { makeAutoObservable, computed } from 'mobx'

import { API } from '@/api'

const RATES_CACHE_LENGTH = 60 * 60 * 1000 // one hour in ms

class ExchangeRatesStore {
  initialized = false

  exchangeRates = {
    values: { USD: 1 },
    lastUpdatedAt: 0,
  }

  private localStorageKey = 'HarvestFinance:exchangeRates'

  @computed
  get supportedCurrencies() {
    return Object.keys(this.exchangeRates.values)
  }

  constructor() {
    makeAutoObservable(this)
    this.init()
  }

  private async init() {
    this.readCache()
    this.initialized = true
  }

  // if cached rates exist and they are recent, use them
  // if cached rates exist but they are old, use them but request new ones
  private async readCache() {
    const cachedRates = localStorage.getItem(this.localStorageKey)
    if (!cachedRates) return this.updateRates()
    const parsedCachedRates = JSON.parse(cachedRates)
    this.exchangeRates = parsedCachedRates

    if (parsedCachedRates.lastUpdatedAt < Date.now() - RATES_CACHE_LENGTH) {
      this.updateRates()
    }
  }

  private async updateRates() {
    const newRates = await API.getExchangeRates()

    if (newRates) {
      this.exchangeRates.values = newRates
      this.exchangeRates.lastUpdatedAt = Date.now()
      this.updateCache()
    }
  }

  private updateCache() {
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.exchangeRates),
    )
  }
}

export const exchangeRatesStore = new ExchangeRatesStore()
