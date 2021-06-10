import { makeAutoObservable } from 'mobx'
import { exchangeRatesStore } from './resources'

class SettingsStore {
  initialized = false

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
    this.readCache()
    this.initialized = true
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

export const settingsStore = new SettingsStore()
