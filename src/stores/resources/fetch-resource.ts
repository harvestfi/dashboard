import { makeAutoObservable } from 'mobx'

export class FetchResource<T> {
  error = null

  value: T | null = null

  isFetching = false

  constructor(private fetchFn: (params?: string) => Promise<T>) {
    makeAutoObservable(this)
  }

  async fetch(params?: string) {
    if (this.error) {
      this.error = null
    }

    this.isFetching = true

    try {
      const response = await this.fetchFn(params)
      this.value = response
      this.isFetching = false

      return response
    } catch (error) {
      this.error = error
    }
  }
}
