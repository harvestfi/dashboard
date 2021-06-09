import { makeAutoObservable } from 'mobx'
import { exchangeRatesStore } from './resources'

class SettignsStore {
  inited = false

  settings = {
    currency: {
      options: ['USD'],
      value: 'USD',
    },
    theme: {
      value: 'light',
    },
  }

  private localStorageKey = 'HarvestFinance:settings'

  constructor() {
    makeAutoObservable(this)
    this.init()
  }

  change(key: keyof typeof settingsStore.settings, value: string | boolean) {
    this.settings[key].value = value
    this.updateCache()
  }

  private async init() {
    // TODO fix
    // this.readCache()
    // const exchangeRatesResponse = await exchangeRatesStore.fetch('?base=USD')

    // this.settings.currency.options = Object.keys(exchangeRatesResponse)
    this.inited = true
  }

  private readCache() {
    const settingCache = localStorage.getItem(this.localStorageKey)

    if (settingCache) {
      this.settings = JSON.parse(settingCache)
    }
  }

  private updateCache() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.settings))
  }
}

export const settingsStore = new SettignsStore()
