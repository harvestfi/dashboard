import { makeAutoObservable } from 'mobx'

class AssetsStore {
  private assetsToCheck: any[] = []
  private showAssetsToCheck = false

  constructor() {
    makeAutoObservable(this)
  }

  setAssetsToCheck(assetsToCheck: any[]) {
    this.assetsToCheck = assetsToCheck
  }

  setShowAssetsToCheck(showAssetsToCheck: boolean) {
    this.showAssetsToCheck = showAssetsToCheck
  }
}

export const assetsStore = new AssetsStore()
