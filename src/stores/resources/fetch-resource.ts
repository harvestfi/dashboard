import { observable, action } from 'mobx'

export class FetchResource<T> {
  @observable
  error = null

  @observable
  value: T | null = null

  @observable
  isFetching = false

  protected fetchFn?: Function

  constructor(fetchFn?: Function) {
    if (fetchFn) {
      this.fetchFn = fetchFn
    }
  }

  @action.bound
  async fetch(params?: string) {
    if (this.error) {
      this.error = null
    }

    this.isFetching = true

    try {
      if (!this.fetchFn) {
        console.warn('[FetchResource.fetchFn] fetchFn must be defined')
        this.isFetching = false
      } else {
        const response = await this.fetchFn(params)
        this.value = response
        this.isFetching = false
        return response
      }
    } catch (error) {
      this.error = error
    }
  }
}
