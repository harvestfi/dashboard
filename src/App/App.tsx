import React from 'react'
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from '@/App/styles/appStyles'

import { ErrorModal } from '@/components/ErrorModal'
import { Header } from '@/components/Header'
import { SideDrawer } from '@/components/SlideDrawer'
import { Radio } from '@/components/radio/Radio'
import { Panel, GlobalStyle, Container } from '@/App/styles/AppJsStyles'

import { observer } from 'mobx-react'
import { Routes } from '@/routes'
import { useStores } from '@/stores/utils'

import './styles/App.scss'

export const App = observer(() => {
  const { settingsStore } = useStores()

  const theme =
    settingsStore.settings.theme.value === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SideDrawer />
      <Container>
        <Header />
        <Panel>
          <Radio />
          <Routes />
        </Panel>
      </Container>
      <ErrorModal />
    </ThemeProvider>
  )
})
