import { makeAutoObservable } from 'mobx'
import { ethers } from 'ethers'
import { web3Store } from './web3-store'
import { assetsStore } from './assets-store'
import { getEtheriumAssets, getBSCAssets } from '@/utils/utils'

const validateAddress = (address: string) => {
  try {
    ethers.utils.getAddress(address)
  } catch (e) {
    return false
  }
  return true
}

class MetaMaskStore {
  private web3Store: typeof web3Store
  private assetsStore: typeof assetsStore
  private provider: any = null
  private address = ''
  validationMessage = ''

  isConnecting = false
  isCheckingBalance = false

  constructor() {
    makeAutoObservable(this)

    this.web3Store = web3Store
    this.assetsStore = assetsStore

    if (this.web3Store.web3modal.cachedProvider) {
      this.connectMetaMask()
    }

    window.ethereum.on('accountsChanged', this.disconnect)
  }

  disconnect() {
    this.web3Store.web3modal.clearCachedProvider()
    this.provider = null
    this.address = ''
    this.isConnecting = false
    this.isCheckingBalance = false
    this.validationMessage = ''
  }

  setAddress(value: string) {
    this.address = value
  }

  async setAddressToCheck(address: string, onError: (error: string) => void) {
    if (address && validateAddress(address)) {
      metaMaskStore.setCheckingBalance(true)

      const [etheriumAssetsToCheck, BSCAssetsToCheck] = await Promise.all([
        getEtheriumAssets(address),
        getBSCAssets(address),
      ])

      this.assetsStore.setAssetsToCheck([
        ...etheriumAssetsToCheck,
        ...BSCAssetsToCheck,
      ])
      this.assetsStore.setShowAssetsToCheck(true)
      this.address = address
    } else {
      this.validationMessage = 'You must enter a valid address'
    }
  }

  setConnection(provider: any) {
    this.provider = provider
  }

  setIsConnecting(value: boolean) {
    this.isConnecting = value
  }

  setCheckingBalance(value: boolean) {
    this.isCheckingBalance = value
  }

  setProvider(provider: any, onError?: Function) {
    const ethersProvider = new ethers.providers.Web3Provider(provider)

    const signer = ethersProvider.getSigner()

    this.setConnection(provider)

    signer
      .getAddress()
      .then((address) => {
        this.setAddress(address)
      })
      .catch(() => {
        if (onError) onError()
      })
  }

  async connectMetaMask(onError?: Function, onProviderError?: Function) {
    this.setIsConnecting(false)
    this.setCheckingBalance(false)

    this.web3Store.web3modal
      .connect()
      .then((provider) => {
        if (!provider) {
          if (onProviderError) onProviderError()
        } else {
          window.ethereum
            .enable()
            .then(() => {
              this.setProvider(provider, onError)
            })
            .catch(() => {
              if (onError) onError()
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const metaMaskStore = new MetaMaskStore()
