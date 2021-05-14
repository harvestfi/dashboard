import { getBSCAssets, getEtheriumAssets } from '@/utils/utils'
import { FetchResource } from './fetch-resource'

export class AssetsStore extends FetchResource<any> {
  address?: string

  setAddress(address: string) {
    this.address = address
  }

  protected async fetchFn() {
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

  constructor() {
    super()
  }
}

export const userAssetsStore = new AssetsStore()
export const assetToCheckStore = new AssetsStore()
