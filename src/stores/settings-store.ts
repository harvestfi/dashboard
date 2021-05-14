import { makeAutoObservable } from 'mobx'
import { exchangeRates } from './resources'

class SettignsStore {
  inited = false
  settings: any = {}
  private exchangeRates

  constructor() {
    makeAutoObservable(this)
    this.exchangeRates = exchangeRates
    this.init()
  }

  async init() {
    const exchangeRatesResponse = await this.exchangeRates.fetchResource.fetch(
      '?base=USD',
    )

    this.settings = {
      exchangeRates: {
        options: exchangeRatesResponse,
        value: 1,
      },
    }

    this.inited = true
  }

  change(key: string, value: string | number) {
    this.settings[key] = value
  }
}

export const settingStore = new SettignsStore()
