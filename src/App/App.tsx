import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Row, Col } from 'styled-bootstrap-grid'
import { darkTheme, lightTheme } from '@/styles/appStyles'

import TabContainer from '@/components/tabContainer/TabContainer'
import SettingsModal from '@/components/userSettings/SettingsModal'
import Sidedrawer from '@/components/userSettings/sidedrawer/Sidedrawer'
import { observer } from 'mobx-react'
import { Routes } from '@/routes/'
import { useStores } from '@/stores/utils'
import { ErrorModal } from '@/components/ErrorModal'

import logo from '@/assets/newLogo.png'

import {
  Topbar,
  GlobalStyle,
  Brand,
  Panel,
  Container,
} from '@/styles/AppJsStyles'

export const App = observer(() => {
  const { settingsStore } = useStores()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const toggleUserSettings = () => {
    setSettingsOpen(!settingsOpen)
  }
  const toggleSideDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  const theme =
    settingsStore.settings.theme.value === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      {openDrawer && <Sidedrawer />}

      <Container>
        <Row>
          <Col col>
            <Topbar>
              <Brand>
                <img src={logo} alt="harvest finance logo" />{' '}
                {!openDrawer && <span>harvest.dashboard</span>}
              </Brand>
              <i
                onClick={toggleUserSettings}
                onKeyUp={toggleUserSettings}
                className="fas fa-user-cog"
                role="button"
                tabIndex="0"
              />
              {settingsOpen && (
                <SettingsModal toggleUserSettings={toggleUserSettings} />
              )}
              <i
                className="fas fa-bars"
                onClick={toggleSideDrawer}
                onKeyUp={toggleSideDrawer}
                role="button"
                tabIndex="0"
              />
            </Topbar>
          </Col>
        </Row>
        {/* <Row>
            <Col>
              {!isCheckingBalance && (
                <>
                   <TabContainer /> 
                  <Panel>
                    <Radio />

                    <TokenMessage />
                    <HarvestAndStakeMessage />

                    {metaMaskStore.isConnected ? (
                      <>
                        <ModeSelectBoard state={state} setState={setState} />
                      </>
                    ) : (
                      <>
                        { <WelcomeText
                          state={state}
                          openModal={openModal}
                          disconnect={disconnect}
                          setConnection={setConnection}
                          setAddress={setUserWalletAddress}
                        /> *
                      </>
                    )}
                  </Panel>
                </>
              )}
            </Col>
          </Row> */}

        <TabContainer />
        <Routes />

        {/* {metaMaskStore.isConnected && !isConnecting && (
            <>
              <Row>
                <Col style={{ marginTop: '3rem', marginBottom: '3rem' }}>
                  {isCheckingBalance ? <TabContainer /> : ''}
                  <Panel>
                    <CheckBalance state={state} />
                  </Panel>
                </Col>
              </Row>
            </>
          )} */}
      </Container>
      <ErrorModal />
    </ThemeProvider>
  )
})
