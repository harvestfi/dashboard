import { makeAutoObservable } from 'mobx'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

class Web3Store {
  web3modal: Web3Modal

  constructor() {
    makeAutoObservable(this)

    this.web3modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: process.env.REACT_APP_INFURA_KEY,
          },
        },
      },
    })
  }
}

export const web3Store = new Web3Store()
