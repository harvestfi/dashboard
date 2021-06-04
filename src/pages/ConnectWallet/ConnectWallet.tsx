import React from 'react'
import { Redirect } from 'react-router-dom'
import * as Styled from './styles'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'
import { PATHS } from '@/routes'

type ConnectWalletProps = {}

export const ConnectWallet: React.FC<ConnectWalletProps> = observer((props) => {
  const { metaMaskStore } = useStores()
  const history = useHistory()

  const connectWallet = () => {
    metaMaskStore.connectMetaMask().then(() => {
      history.push(PATHS.switchBalance)
    })
  }

  // Users who have a cachedProvider might land here. Since this is the index page,
  // we should disconnect them and allow them to re-connect their wallet.
  if (metaMaskStore.isConnected) {
    metaMaskStore.disconnect()
  }

  return (
    <>
      <Styled.WelcomeTextPanel>
        <h1>Harvest Finance Dashboard</h1>
        <h4>Connect a wallet to get started</h4>
        {!metaMaskStore.isConnecting && (
          <button className="button" onClick={connectWallet} type="button">
            Connect Wallet
          </button>
        )}
        <h6 className="foot-note">
          You will need a web3 wallet such as metamask to access this
          application.
        </h6>
      </Styled.WelcomeTextPanel>
    </>
  )
})
