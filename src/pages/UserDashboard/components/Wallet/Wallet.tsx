import React from 'react'
import * as Styled from './styles'
import { prettyEthAddress } from '@/utils/utils'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'

export const Wallet = observer(() => {
  const { userAssetsStore, metaMaskStore } = useStores()

  return (
    <Styled.WalletContainer>
      <Styled.WalletTab>wallet</Styled.WalletTab>
      {userAssetsStore.address && (
        <Styled.WalletConnection>
          <span className="connect-status-container">
            <span id="address">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://etherscan.io/address/${userAssetsStore.address}`}
              >
                {prettyEthAddress(userAssetsStore.address) || ''}
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
