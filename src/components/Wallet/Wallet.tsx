import React from 'react'
import * as Styled from './styles'
import { prettyEthAddress } from '@/utils/utils'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'
import { PATHS } from '@/routes'

type WalletProps = {}

export const Wallet: React.FC<WalletProps> = observer((props) => {
  const { metaMaskStore, appStore } = useStores()
  const history = useHistory()

  const disconnect = () => {
    metaMaskStore.disconnect()
    history.push(PATHS.main)
  }

  const connect = async () => {
    await metaMaskStore.connectMetaMask()
    appStore.setAddress(metaMaskStore.walletAddress)
    history.push(
      PATHS.checkBalance.replace(':address', metaMaskStore.walletAddress),
    )
  }

  return (
    <Styled.Container>
      <Styled.Tab>wallet</Styled.Tab>
      {!metaMaskStore.walletAddress && (
        <Styled.Connection>
          <div className="connect-status-container">
            <div className="button-div connect">
              <button onClick={connect} className="clear button" type="button">
                Connect
              </button>
            </div>
          </div>
        </Styled.Connection>
      )}

      {metaMaskStore.walletAddress && (
        <Styled.Connection>
          <span className="connect-status-container">
            <span id="address">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://etherscan.io/address/${metaMaskStore.walletAddress}`}
              >
                {prettyEthAddress(metaMaskStore.walletAddress)}
              </a>
            </span>

            <div className="button-div">
              <button
                onClick={disconnect}
                className="clear button"
                type="button"
              >
                Disconnect
              </button>
            </div>
          </span>
        </Styled.Connection>
      )}
    </Styled.Container>
  )
})
