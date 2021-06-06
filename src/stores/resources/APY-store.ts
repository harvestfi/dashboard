import { FetchResource } from './fetch-resource'
import { API } from '@/api'

class APYStore extends FetchResource<any> {
  constructor() {
    super(API.getAPY)
    this.fetch()
  }
}

export const apyStore = new APYStore()
