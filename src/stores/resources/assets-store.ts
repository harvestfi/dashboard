import { getBSCAssets, getEtheriumAssets } from '@/utils/utils'
import { FetchResource } from './fetch-resource'
import { settingsStore } from '@/stores/settings-store'
import { exchangeRatesStore } from './exchange-rates-store'
import { observable, action, computed, makeObservable, override } from 'mobx'
import BigNumber from 'bignumber.js'

export class AssetsStore extends FetchResource {
  private readonly settingsStore = settingsStore

  private readonly exchangeRatesStore = exchangeRatesStore

  @observable
  address?: string

  @action.bound
  setAddress(address: string) {
    this.address = address
  }

  constructor() {
    super()
    makeObservable(this)
  }

  @override
  reset() {
    super.reset()
    this.address = undefined
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
    if (!this.address) {
      console.warn('[AssetsStore.fetchFn] address must be defined')
      return
    }

    const [etheriumAssets, BSCAssets] = await Promise.all([
      getEtheriumAssets(this.address),
      getBSCAssets(this.address),
    ])

    return [...etheriumAssets, ...BSCAssets]
  }
}

export const userAssetsStore = new AssetsStore()
export const assetToCheckStore = new AssetsStore()
