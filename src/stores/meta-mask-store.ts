import { makeAutoObservable } from 'mobx'
import { ethers } from 'ethers'
import { web3Store } from './web3-store'
import { assetsStore } from './assets-store'
import { getEtheriumAssets, getBSCAssets } from '@/utils/utils'
import { errorModalStore } from '@/stores/views'

class MetaMaskStore {
  private web3Store: typeof web3Store
  private assetsStore: typeof assetsStore
  private errorModalStore: typeof errorModalStore

  address = ''

  validationMessage = ''
  provider: any = null
  isConnecting = false
  isCheckingBalance = false

  get isConnected() {
    return this.provider !== null
  }

  constructor() {
    makeAutoObservable(this)

    this.web3Store = web3Store
    this.assetsStore = assetsStore
    this.errorModalStore = errorModalStore

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

  async setAddressToCheck(address: string) {
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

  async setProvider(provider: any) {
    const ethersProvider = new ethers.providers.Web3Provider(provider)
    const signer = ethersProvider.getSigner()
    this.setConnection(provider)

    try {
      const address = await signer.getAddress()
      this.setAddress(address)
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
    this.setCheckingBalance(false)

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
