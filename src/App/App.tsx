import React from 'react'
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from '@/App/styles/appStyles'

import { ErrorModal } from '@/components/ErrorModal'
import { Header } from '@/components/Header'

import { observer } from 'mobx-react'
import { Routes } from '@/routes'
import { useStores } from '@/stores/utils'

import { GlobalStyle, Container } from '@/App/styles/AppJsStyles'
import './styles/App.scss'

export const App = observer(() => {
  const { settingsStore } = useStores()

  const theme =
    settingsStore.settings.theme.value === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Header />
        <Routes />
      </Container>
      <ErrorModal />
    </ThemeProvider>
  )
})
