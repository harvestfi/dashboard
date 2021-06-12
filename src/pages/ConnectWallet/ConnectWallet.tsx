import React from 'react'
import * as Styled from './styles'
import { EnterReadOnlyAddress } from '@/components/EnterReadOnlyAddress'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'
import { PATHS } from '@/routes'

type ConnectWalletProps = {}

export const ConnectWallet: React.FC<ConnectWalletProps> = observer((props) => {
  const { metaMaskStore } = useStores()
  const history = useHistory()

  const connectWallet = () => {
    // Users who have a cachedProvider might land here, on the index page.
    // Since this is the index, we should transparetly disconnect them and
    // allow them to re-connect their wallet.
    if (!metaMaskStore.isConnecting && metaMaskStore.isConnected) {
      metaMaskStore.disconnect()
    }

    metaMaskStore.connectMetaMask().then(() => {
      history.push(PATHS.userDashboard)
    })
  }

  return (
    <>
      <EnterReadOnlyAddress />
    </>
  )
})
