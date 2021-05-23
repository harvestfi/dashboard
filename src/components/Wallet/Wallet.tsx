import React from 'react'
import * as Styled from './styles'
import { prettyEthAddress } from '@/utils/utils'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'

type WalletProps = {
  address: string
}

export const Wallet: React.FC<WalletProps> = observer((props) => {
  const { address } = props
  const { metaMaskStore } = useStores()

  return (
    <Styled.WalletContainer>
      <Styled.WalletTab>wallet</Styled.WalletTab>
      {address && (
        <Styled.WalletConnection>
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
                onClick={metaMaskStore.disconnect}
                className="clear button"
                type="button"
              >
                Disconnect
              </button>
            </div>
          </span>
        </Styled.WalletConnection>
      )}
    </Styled.WalletContainer>
  )
})
