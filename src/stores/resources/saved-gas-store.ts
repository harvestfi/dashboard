import { FetchResource } from './fetch-resource'
import { API } from '@/api'

class SavedGasStore extends FetchResource<any> {
  constructor() {
    super(API.getPersonalGasSaved)
  }
}

export const savedGasStore = new SavedGasStore()
