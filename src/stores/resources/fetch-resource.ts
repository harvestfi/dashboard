import { makeAutoObservable } from 'mobx'
import axios from 'axios'

export class FetchResource<T> {
  error = null

  value: T | null = null

  constructor(
    protected url: string,
    private responseLeans: string[] = ['data'],
  ) {
    makeAutoObservable(this)
  }

  async fetch(params?: string) {
    if (this.error) {
      this.error = null
    }

    try {
      const url = `${this.url}${params ?? ''}`
      const response: any = await axios(url)
      const value = this.responseLeans.reduce((res, key) => res[key], response)
      this.value = value

      return value
    } catch (error) {
      this.error = error
    }
  }
}
