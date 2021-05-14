import { makeAutoObservable } from 'mobx'
import { ethers } from 'ethers'
import { web3Store } from './web3-store'
import { errorModalStore } from '@/stores/views'
import { userAssetsStore } from './resources/assets-store'

class MetaMaskStore {
  private web3Store: typeof web3Store
  private errorModalStore: typeof errorModalStore
  private userAssetsStore: typeof userAssetsStore

  userAssets = []
  address = ''

  assetsToCheck = []
  addressToCheck = ''

  validationMessage = ''
  provider: any = null
  isConnecting = false

  get isConnected() {
    return this.provider !== null
  }

  constructor() {
    makeAutoObservable(this)

    this.web3Store = web3Store
    this.errorModalStore = errorModalStore
    this.userAssetsStore = userAssetsStore

    if (this.web3Store.web3modal.cachedProvider) {
      this.connectMetaMask()
    }

    window.ethereum.on('accountsChanged', this.disconnect)
  }

  disconnect() {
    this.web3Store.web3modal.clearCachedProvider()
    this.provider = null
    this.isConnecting = false
    this.validationMessage = ''
  }

  setConnection(provider: any) {
    this.provider = provider
  }

  setIsConnecting(value: boolean) {
    this.isConnecting = value
  }

  async setProvider(provider: any) {
    const ethersProvider = new ethers.providers.Web3Provider(provider)
    const signer = ethersProvider.getSigner()
    this.setConnection(provider)

    try {
      const address = await signer.getAddress()
      this.userAssetsStore.setAddress(address)
    } catch (error) {
      this.errorModalStore.open(
        'Something has gone wrong, retrying...',
        'error',
      )
      console.log(error)
    }
  }

  async connectMetaMask() {
    this.setIsConnecting(false)

    const provider = await this.web3Store.web3modal.connect()

    if (!provider) {
      this.errorModalStore.open(
        'No provider, please install a supported Web3 wallet.',
        'error',
      )
    } else {
      try {
        await window.ethereum.enable()
        await this.setProvider(provider)
      } catch (error) {
        this.errorModalStore.open(
          'Something has gone wrong, retrying...',
          'error',
        )
        console.log(error)
      }
    }
  }
}

export const metaMaskStore = new MetaMaskStore()
