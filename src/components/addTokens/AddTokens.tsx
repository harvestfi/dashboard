import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from '../../styles/appStyles'
import { tokens, tokens2 } from './AvailableTokens'
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

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <Styled.Panel>
        <h1>Add assets to wallet</h1>
        <div className="inner">
          <div className="token-container first">
            {tokens.map((token) => (
              <Styled.Token
                onClick={() => metaMaskStore.addTokenToWallet(token)}
                key={token.name}
                {...token}
              >
                <img alt={token.name} src={token.image} />
                <span>{token.name}</span>
              </Styled.Token>
            ))}
          </div>
          <div className="token-container">
            {tokens2.map((token) => (
              <Styled.Token
                onClick={() => metaMaskStore.addTokenToWallet(token)}
                key={token.name}
                {...token}
              >
                <img alt={token.name} src={token.image} />
                <span>{token.name}</span>
              </Styled.Token>
            ))}
          </div>
        </div>
      </Styled.Panel>
    </ThemeProvider>
  )
})

export default AddTokens
