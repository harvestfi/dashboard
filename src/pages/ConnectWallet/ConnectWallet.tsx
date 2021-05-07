import React from 'react'
import * as Styled from './styles'
import { useStores } from '@/stores/utils'

export const ConnectWallet = (props) => {
  const { openModal } = props
  const { metaMaskStore } = useStores()

  return (
    <Styled.WelcomeTextPanel>
      <h1>Harvest Finance Dashboard</h1>
      <h4>Connect a wallet to get started</h4>
      {!metaMaskStore.isConnecting && (
        <button
          className="button"
          onClick={() => {
            metaMaskStore.connectMetaMask(
              () => {
                openModal('Something has gone wrong, retrying...', 'error')
              },
              () => {
                openModal(
                  'No provider, please install a supported Web3 wallet.',
                  'error',
                )
              },
            )
          }}
          type="button"
        >
          Connect Wallet
        </button>
      )}
      <h6 className="foot-note">
        You will need a web3 wallet such as metamask to access this application.
      </h6>
    </Styled.WelcomeTextPanel>
  )
}
