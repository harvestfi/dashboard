import { getBSCAssets, getEtheriumAssets } from '@/utils/utils'
import { FetchResource } from './fetch-resource'
import { settingsStore } from '@/stores/settings-store'
import { exchangeRatesStore } from './exchange-rates-store'
import { observable, action, computed, makeObservable } from 'mobx'
import BigNumber from 'bignumber.js'

export class AssetsStore {
  private readonly settingsStore = settingsStore

  private readonly exchangeRatesStore = exchangeRatesStore

  @observable
  address?: string

  @action.bound
  setAddress(address: string) {
    this.address = address
  }

  @observable
  error: string | null = null

  @observable
  value: T | null = null

  @observable
  isFetching = false

  @observable
  isFetched = false

  @observable
  count = 0

  constructor() {
    makeObservable(this)
  }

  @action.bound
  increment() {
    console.log('this.count', this.count)
    this.count++
  }

  @action.bound
  private setError(error: string | null) {
    this.error = error
  }

  @action.bound
  private setIsFetching(isFetching: boolean) {
    this.isFetching = isFetching
  }

  @action.bound
  private setIsFetched(isFetched: boolean) {
    this.isFetched = isFetched
  }

  @action.bound
  private setValue(value: T) {
    this.value = value
  }

  async fetch(params?: string) {
    if (this.error) {
      this.setError(null)
    }

    this.setIsFetching(true)

    try {
      if (!this.fetchFn) {
        console.warn('[FetchResource.fetchFn] fetchFn must be defined')
      } else {
        const response = await this.fetchFn(params)
        this.setValue(response)
      }
    } catch (error) {
      this.setError(error)
    } finally {
      this.setIsFetching(false)
      this.setIsFetched(true)
    }
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