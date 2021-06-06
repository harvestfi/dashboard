import { makeAutoObservable } from 'mobx'
import { ethers, Contract, providers } from 'ethers'
import { web3Store } from './web3-store'
import { errorModalStore } from '@/stores/views'
import { appStore } from './app-store'
import { assetsStore } from './resources/assets-store'

const checkForToken = async (token: any) => {
  // The minimum ABI to get ERC20 Token balance
  const minABI = [
    // balanceOf
    {
      constant: true,
      inputs: [{ name: '_owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: 'balance', type: 'uint256' }],
      type: 'function',
    },
    // decimals
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [{ name: '', type: 'uint8' }],
      type: 'function',
    },
  ]
  // Get ERC20 Token contract instance
  const contract = new Contract(
    token.address,
    minABI,
    providers.getDefaultProvider(),
  )
  // calculate a balance
  const balance = await contract.balanceOf(appStore.address)
  return parseInt(balance, 16)
}

class MetaMaskStore {
  private readonly web3Store = web3Store
  private readonly errorModalStore = errorModalStore
  private readonly assetsStore = assetsStore
  private readonly appStore = appStore

  isConnecting = false
  tokenAddedMessage = ''

  provider: any = null

  get isConnected() {
    return this.provider !== null
  }

  constructor() {
    makeAutoObservable(this)

    if (this.web3Store.web3modal.cachedProvider) {
      this.connectMetaMask()
    }

    window.ethereum.on('accountsChanged', this.disconnect)
  }

  disconnect() {
    this.web3Store.web3modal.clearCachedProvider()
    this.provider = null
    this.assetsStore.reset()
    this.appStore.setAddress(null)
  }

  setTokenAddedMessage(message: string) {
    this.tokenAddedMessage = message
  }

  async setProvider(provider: any) {
    const ethersProvider = new ethers.providers.Web3Provider(provider)
    const signer = ethersProvider.getSigner()
    this.provider = provider

    try {
      const address = await signer.getAddress()
      this.appStore.setAddress(address)
    } catch (error) {
      this.errorModalStore.open(
        'Something has gone wrong, retrying...',
        'error',
      )
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  async connectMetaMask() {
    this.isConnecting = true
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
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }

    this.isConnecting = false
  }

  async addTokenToWallet(token: any) {
    const response = await window.ethereum.request({
      method: 'metamask_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: token.address,
          symbol: token.symbol,
          decimals: token.decimals,
          image: token.tokenImage,
        },
      },
      // id: Math.round(Math.random() * 100000),
    })

    if ((await checkForToken(token)) > 0 && response) {
      this.setTokenAddedMessage(`${token.name} is already in your wallet.`)
    } else if (response) {
      this.setTokenAddedMessage(`${token.name} was added to your wallet.`)
    } else {
      this.setTokenAddedMessage(`${token.name} was not added to your wallet.`)
    }
  }
}

export const metaMaskStore = new MetaMaskStore()
