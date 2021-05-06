import { makeAutoObservable } from 'mobx'
import { ethers } from 'ethers'
import { web3Store } from './web3-store'

class MetaMaskStore {
  private web3Store: typeof web3Store
  provider = null
  address = ''
  isConnecting = false
  isCheckingBalance = false

  constructor() {
    makeAutoObservable(this)

    this.web3Store = web3Store

    if (this.web3Store.web3modal.cachedProvider) {
      this.connectMetamask()
    }

    window.ethereum.on('accountsChanged', this.disconnect)
  }

  disconnect() {
    this.web3Store.web3modal.clearCachedProvider()
    this.provider = null
    this.address = ''
    this.isConnecting = false
    this.isCheckingBalance = false
  }

  setAddress(value: string) {
    this.address = value
  }

  setConnection(provider) {
    this.provider = provider
  }

  setIsConnecting(value: boolean) {
    this.isConnecting = value
  }

  setCheckingBalance(value: boolean) {
    this.isCheckingBalance = value
  }

  async setProvider(provider, onCatch) {
    const ethersProvider = new ethers.providers.Web3Provider(provider)

    const signer = ethersProvider.getSigner()

    this.setConnection(provider)

    // get the user address
    signer
      .getAddress() // refreshButtonAction called initially to load table
      .then((address) => {
        this.setAddress(address)
      })
      .catch(onCatch)
    // this.web3Store.web3modal.openModal('Something has gone wrong, retrying...', 'error')
  }

  connectMetamask({ onError, onProviderError }) {
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
              this.setProvider(provider)
            })
            .catch(onError)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const metaMaskStore = new MetaMaskStore()
