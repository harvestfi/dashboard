import { makeAutoObservable } from 'mobx'

export class FetchResource<T> {
  error = null

  value: T | null = null

  isFetching = false

  constructor(protected fetchFn?: Function) {
    makeAutoObservable(this)
  }

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
