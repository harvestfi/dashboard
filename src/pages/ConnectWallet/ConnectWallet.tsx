import React, { useEffect } from 'react'
import * as Styled from './styles'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'
import { PATHS } from '@/routes'
import { client } from '@/api/apolloClient'
import { POOLS_QUERY } from '@/api/gql/pool-query.gql'
import { VAULTS_QUERY } from '@/api/gql/vault-query.gql'

type ConnectWalletProps = {}

export const ConnectWallet: React.FC<ConnectWalletProps> = observer((props) => {
  const { metaMaskStore } = useStores()
  const history = useHistory()

  const connectWallet = () => {
    metaMaskStore.connectMetaMask().then(() => {
      history.push(PATHS.switchBalance)
    })
  }

  useEffect(() => {
    client
      .query({
        query: VAULTS_QUERY,
        variables: {},
      })
      .then((response) => {
        console.log('vaults response', response)
      })

    client
      .query({
        query: POOLS_QUERY,
        variables: {},
      })
      .then((response) => {
        console.log('pools response', response)
      })
  }, [])

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
