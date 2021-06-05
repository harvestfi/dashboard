import { FetchResource } from './fetch-resource'
import { API } from '@/api'
import { computed } from 'mobx'
import BigNumber from 'bignumber.js'

class SavedGasStore extends FetchResource<any> {
  constructor() {
    super(API.getPersonalGasSaved)
  }

  @computed
  get gasSaved() {
    if (!this.value) return new BigNumber(0)
    return new BigNumber(this.value)
  }
}

export const savedGasStore = new SavedGasStore()
