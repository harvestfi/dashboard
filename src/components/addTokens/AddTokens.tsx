import React, { useEffect, useCallback } from 'react'
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from '../../App/styles/appStyles'
import { tokens } from './AvailableTokens'
import * as Styled from './styles'
import { observer } from 'mobx-react'
import { useStores } from '@/stores/utils'

const AddTokens = observer(() => {
  const { settingsStore, metaMaskStore } = useStores()

  const theme = settingsStore.settings.theme

  useEffect(() => {
    const timer = setTimeout(() => {
      metaMaskStore.setTokenAddedMessage('')
    }, 1500)
    return () => clearTimeout(timer)
    // eslint-disable-next-line
  }, [metaMaskStore.tokenAddedMessage])

  const renderToken = useCallback(
    (token) => {
      return (
        <Styled.Token
          onClick={() => metaMaskStore.addTokenToWallet(token)}
          key={token.name}
          {...token}
        >
          <img alt={token.name} src={token.image} />
          <span>{token.name}</span>
        </Styled.Token>
      )
    },
    [metaMaskStore],
  )

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <Styled.Panel>
        <h1>Add assets to wallet</h1>
        <div className="inner">
          <div className="token-container first">
            {tokens[0].map(renderToken)}
          </div>
          <div className="token-container">{tokens[1].map(renderToken)}</div>
        </div>
      </Styled.Panel>
    </ThemeProvider>
  )
})

export default AddTokens
