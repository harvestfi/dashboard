import { observable, action, runInAction } from 'mobx'

export class FetchResource<T> {
  @observable
  error: string | null = null

  @observable
  value: T | null = null

  @observable
  isFetching = false

  @observable
  isFetched = false

  protected fetchFn?: Function

  constructor(fetchFn?: Function) {
    if (fetchFn) {
      this.fetchFn = fetchFn
    }
  }

  @action
  private setError(error: string | null) {
    this.error = error
  }

  @action
  private setIsFetching(isFetching: boolean) {
    this.isFetching = isFetching
  }

  @action
  private setIsFetched(isFetched: boolean) {
    this.isFetched = isFetched
  }

  @action
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
        return response
      }
    } catch (error) {
      this.setError(error)
    } finally {
      this.setIsFetching(false)
      this.setIsFetched(true)
    }
  }
}
