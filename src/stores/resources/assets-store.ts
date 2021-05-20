import { getBSCAssets, getEtheriumAssets } from '@/utils/utils'
import { FetchResource } from './fetch-resource'
import { settingsStore } from '@/stores/settings-store'
import { exchangeRatesStore } from './exchange-rates-store'
import { observable, action, computed } from 'mobx'
import BigNumber from 'bignumber.js'

export class AssetsStore extends FetchResource<any> {
  @observable
  private readonly settingsStore = settingsStore

  @observable
  private readonly exchangeRatesStore = exchangeRatesStore

  @observable
  address?: string

  @action.bound
  setAddress(address: string) {
    this.address = address
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
        const currentAssetValue = currentAsset.value
          ? currentAsset.value
          : new BigNumber(0)
        return acc.plus(currentAssetValue)
      }, new BigNumber(0))
      .multipliedBy(currentExchangeRate)
  }

  protected fetchFn = async () => {
    console.log('this.address', this.address)

    if (!this.address) {
      console.warn('[AssetsStore.fetchFn] address must be defined')
      return
    }

    const [etheriumAssets, BSCAssets] = await Promise.all([
      getEtheriumAssets(this.address),
      getBSCAssets(this.address),
    ])

    console.log('- - - - end fetch valuts')

    return [...etheriumAssets, ...BSCAssets]
  }
}

export const userAssetsStore = new AssetsStore()
export const assetToCheckStore = new AssetsStore()
