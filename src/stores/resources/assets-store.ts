import { FetchResource } from './fetch-resource'
import { computed, makeObservable } from 'mobx'
import BigNumber from 'bignumber.js'
import { EthereumService } from '@/services/EthereumService'
import { BSCService } from '@/services/BSCService'
import { IAssetsInfo } from '@/types'

class AssetsStore extends FetchResource<any> {
  constructor() {
    super()
    makeObservable(this)
  }

  @computed
  get stakedBalance() {
    // TODO fix exchangeRatesStore
    // if (this.value === null || this.exchangeRatesStore.value === null)

    if (this.value === null || this.value === undefined) {
      return new BigNumber(0)
    }

    return this.value.reduce((acc: BigNumber, currentAsset: IAssetsInfo) => {
      const currentAssetValue = currentAsset.value ?? new BigNumber(0)
      return acc.plus(currentAssetValue)
    }, new BigNumber(0))
  }

  protected fetchFn = async (address: string) => {
    if (!address) {
      console.warn('[AssetsStore.fetchFn] address must be defined')
      return
    }

    const [etheriumAssets, BSCAssets, snowswapAssets] = await Promise.all<
      IAssetsInfo[],
      IAssetsInfo[],
      IAssetsInfo[]
    >([
      EthereumService.getAssets(address),
      BSCService.getAssets(address),
      EthereumService.getSnowswapAssets(address),
    ])

    return [...etheriumAssets, ...BSCAssets, ...snowswapAssets]
  }
}

export const assetsStore = new AssetsStore()
