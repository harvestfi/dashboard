import { makeObservable, action, observable } from 'mobx'

class AppStore {
  constructor() {
    makeObservable(this)
  }

  @observable
  isEnableRadio = false

  @action.bound
  toggleEnableRadio() {
    this.isEnableRadio = !this.isEnableRadio
  }

  @observable
  isOpenDrawer = false

  @action.bound
  toggleOpenDrawer() {
    this.isOpenDrawer = !this.isOpenDrawer
  }

  @observable
  isOpenUserSettings = false

  @action.bound
  toggleOpenUserSettings() {
    this.isOpenUserSettings = !this.isOpenUserSettings
  }

  @observable
  address: string | null = null

  @action.bound
  setAddress(address: string | null) {
    this.address = address
  }
}

export const appStore = new AppStore()
