import React from 'react'
import * as Styled from './styles'
import { prettyEthAddress } from '@/utils/utils'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'
import { PATHS } from '@/routes'

type WalletProps = {
  address: string
}

export const Wallet: React.FC<WalletProps> = observer((props) => {
  const { address } = props
  const { metaMaskStore } = useStores()
  const history = useHistory()

  const disconnect = () => {
    metaMaskStore.disconnect()
    history.push(PATHS.main)
  }

  return (
    <Styled.Container>
      <Styled.Tab>wallet</Styled.Tab>
      {address && (
        <Styled.Connection>
          <span className="connect-status-container">
            <span id="address">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://etherscan.io/address/${address}`}
              >
                {prettyEthAddress(address)}
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
