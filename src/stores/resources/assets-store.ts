import { getBSCAssets, getEtheriumAssets } from '@/utils/utils'
import { FetchResource } from './fetch-resource'
import { settingsStore } from '@/stores/settings-store'
import { exchangeRatesStore } from './exchange-rates-store'
import { computed, makeObservable } from 'mobx'
import BigNumber from 'bignumber.js'
import { appStore } from '@/stores/app-store'

export class AssetsStore extends FetchResource<any> {
  private readonly settingsStore = settingsStore

  private readonly exchangeRatesStore = exchangeRatesStore

  constructor() {
    super()
    makeObservable(this)
  }

  @computed
  get stakedBalance() {
    if (this.value === null || this.exchangeRatesStore.value === null) {
      return new BigNumber(0)
    }

    const baseCurrency = this.settingsStore.settings.currency.value
    const currentExchangeRate = this.exchangeRatesStore.value[baseCurrency]

    return this.value
      .reduce((acc, currentAsset) => {
        const currentAssetValue = currentAsset.value ?? new BigNumber(0)
        return acc.plus(currentAssetValue)
      }, new BigNumber(0))
      .multipliedBy(currentExchangeRate)
  }

  protected fetchFn = async () => {
    if (!appStore.address) {
      console.warn('[AssetsStore.fetchFn] address must be defined')
      return
    }

    const [etheriumAssets, BSCAssets] = await Promise.all([
      getEtheriumAssets(appStore.address),
      getBSCAssets(appStore.address),
    ])

    return [...etheriumAssets, ...BSCAssets]
  }
}

export const assetsStore = new AssetsStore()
