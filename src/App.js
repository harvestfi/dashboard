import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { Row, Col } from 'styled-bootstrap-grid'
import Loadable from 'react-loadable'
import axios from 'axios'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ModeSelectBoard } from './components/ModeSelectBoard'
import { HarvestContext } from './Context/HarvestContext'
import { darkTheme, lightTheme } from './styles/appStyles'
import { API } from './api'
// images
import logo from './assets/newLogo.png'
// styles
import {
  Topbar,
  GlobalStyle,
  Brand,
  Panel,
  Container,
} from './styles/AppJsStyles'

// components
import TabContainer from './components/tabContainer/TabContainer'
import SettingsModal from './components/userSettings/SettingsModal'
import Radio from './components/radio/Radio'
import { WelcomeText } from './components/WelcomeText'
import CheckBalance from './components/checkBalance/CheckBalance'
import TokenMessage from './components/statusMessages/TokenMessage'
import HarvestAndStakeMessage from './components/statusMessages/HarvestAndStakeMessage'
import Sidedrawer from './components/userSettings/sidedrawer/Sidedrawer'
import { Provider as MobxProvider } from 'mobx-react'
import * as stores from '@/stores'

import { getEtheriumAssets, getBSCAssets } from './utils/utils'
import BigNumber from 'bignumber.js'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { ConnectWallet } from '@/pages/ConnectWallet'

const web3Modal = null
// new Web3Modal({
//   network: 'mainnet', // optional
//   cacheProvider: false, // optional
//   providerOptions: {
//     walletconnect: {
//       package: WalletConnectProvider, // required
//       options: {
//         infuraId: `${process.env.REACT_APP_INFURA_KEY}`, // required
//       },
//     },
//   },
// })

const ErrorModal = Loadable({
  loader: () => import('./components/ErrorModal'),
  loading() {
    return null
  },
})

export function App() {
  // states for user page
  const [userAssets, setUserAssets] = useState([])
  const [userWalletAddress, setUserWalletAddress] = useState('')
  const [showUserAssets, setShowUserAssets] = useState(false)

  // states for page of checking balance
  const [assetsToCheck, setAssetsToCheck] = useState([])
  const [walletAddressToCheck, setWalletAddressToCheck] = useState('')
  const [showAssetsToCheck, setShowAssetsToCheck] = useState(false)
  const [displayFarmInfo, setDisplayFarmInfo] = useState(false)

  // for currency conversion
  const [baseCurrency, setBaseCurrency] = useState(
    window.localStorage.getItem('HarvestFinance:currency') || 'USD',
  )
  const [exchangeRates, setExchangeRates] = useState({})
  const [currentExchangeRate, setCurrentExchangeRate] = useState(1)
  // for currency conversion
  const [openDrawer, setOpenDrawer] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isCheckingBalance, setCheckingBalance] = useState(false)
  const [tokenAddedMessage, setTokenAddedMessage] = useState('')
  const [harvestAndStakeMessage, setHarvestAndStakeMessage] = useState({
    first: '',
    second: '',
  })

  const [state, setState] = useState({
    provider: undefined,
    error: { message: null, type: null, display: false },
    theme: window.localStorage.getItem('HarvestFinance:Theme'),
    minimumHarvestAmount: '0',
    apy: 0,
    farmPrice: new BigNumber(0),
    totalFarmEarned: 0,
  })

  const memoizeExchangeRates = () => {
    axios
      .get('https://api.ratesapi.io/api/latest?base=USD')
      .then((res) => {
        setExchangeRates(res.data.rates)
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }

  useEffect(() => {
    const setAssets = async () => {
      if (state.provider && userWalletAddress) {
        const [userEtheriumAssets, userBSCAssets] = await Promise.all([
          getEtheriumAssets(userWalletAddress),
          getBSCAssets(userWalletAddress),
        ])
        setUserAssets([...userEtheriumAssets, ...userBSCAssets])
        setShowUserAssets(true)
      }
    }
    setAssets()
  }, [state.provider, userWalletAddress])

  useEffect(() => {
    const getAPY = async () => {
      const [APY] = await Promise.all([API.getAPY()])
      setState((prevState) => ({ ...prevState, apy: APY }))
      setDisplayFarmInfo(true)
    }
    getAPY()
  }, [])

  useEffect(() => {
    memoizeExchangeRates()
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      memoizeExchangeRates()
    }, 600000)
    return () => clearTimeout(timer)
  })

  const disconnect = () => {
    setState((prevState) => ({
      ...prevState,
      provider: undefined,
      totalFarmEarned: 0,
      error: { message: null, type: null, display: false },
      theme: window.localStorage.getItem('HarvestFinance:Theme'),
    }))
    setUserWalletAddress('')
    setIsConnecting(false)
    setUserAssets([])
    setShowUserAssets(false)
    web3Modal.clearCachedProvider()
  }

  const closeErrorModal = () => {
    setState((prevState) => ({
      ...prevState,
      error: { message: null, type: null, display: false },
    }))
  }

  const openModal = (message, type) => {
    setState((prevState) => ({
      ...prevState,
      error: { message, type, display: true },
    }))
  }

  const toggleUserSettings = () => {
    setSettingsOpen(!settingsOpen)
  }
  const toggleSideDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  const setConnection = (provider) => {
    setState((prevState) => ({
      ...prevState,
      provider,
    }))
  }

  // Radio Modal
  const [radio, setRadio] = useState(false)

  const toggleRadio = () => {
    setRadio(!radio)
  }

  const setCheckingBalanceStatus = (checking) => {
    setState((prevState) => ({
      ...prevState,
      totalFarmEarned: 0,
    }))
    setCheckingBalance(checking)
  }

  return (
    <MobxProvider {...stores}>
      <Router>
        <HarvestContext.Provider
          value={{
            setShowAssetsToCheck,
            showAssetsToCheck,
            showUserAssets,
            walletAddressToCheck,
            setWalletAddressToCheck,
            userWalletAddress,
            setUserWalletAddress,
            setAssetsToCheck,
            assetsToCheck,
            displayFarmInfo,
            userAssets,
            state,
            setState,
            radio,
            setRadio,
            toggleRadio,
            tokenAddedMessage,
            setTokenAddedMessage,
            isConnecting,
            setIsConnecting,
            isCheckingBalance,
            setCheckingBalance: setCheckingBalanceStatus,
            setConnection,
            disconnect,
            harvestAndStakeMessage,
            setHarvestAndStakeMessage,
            exchangeRates,
            baseCurrency,
            setBaseCurrency,
            currentExchangeRate,
            setCurrentExchangeRate,
            settingsOpen,
            toggleUserSettings,
            openDrawer,
            toggleSideDrawer,
            web3Modal,
          }}
        >
          <ThemeProvider
            theme={state.theme === 'dark' ? darkTheme : lightTheme}
          >
            <GlobalStyle />
            {openDrawer ? <Sidedrawer /> : null}

            <Container>
              <Row>
                <Col col>
                  <Topbar>
                    <Brand>
                      <img src={logo} alt="harvest finance logo" />{' '}
                      {openDrawer ? '' : <span>harvest.dashboard</span>}
                    </Brand>
                    <i
                      onClick={toggleUserSettings}
                      onKeyUp={toggleUserSettings}
                      className="fas fa-user-cog"
                      role="button"
                      tabIndex="0"
                    />
                    {settingsOpen ? <SettingsModal /> : ''}
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

              <Row>
                <Col>
                  <>
                    {!isCheckingBalance && (
                      <>
                        <TabContainer />
                        <Panel>
                          <Radio />

                          <TokenMessage />
                          <HarvestAndStakeMessage />
                          {state.provider ? (
                            <ModeSelectBoard
                              state={state}
                              setState={setState}
                            />
                          ) : (
                            <>
                              <ConnectWallet />
                              {/* <WelcomeText
                                state={state}
                                openModal={openModal}
                                disconnect={disconnect}
                                setConnection={setConnection}
                                setAddress={setUserWalletAddress} */}
                              {/* /> */}
                            </>
                          )}
                        </Panel>
                      </>
                    )}
                  </>
                </Col>
              </Row>
              {state.provider && !isConnecting && (
                <Row>
                  <Col style={{ marginTop: '3rem', marginBottom: '3rem' }}>
                    {isCheckingBalance ? <TabContainer /> : ''}
                    <Panel>
                      <CheckBalance state={state} />
                    </Panel>
                  </Col>
                </Row>
              )}
            </Container>
            <ErrorModal state={state} onClose={() => closeErrorModal()} />
          </ThemeProvider>
        </HarvestContext.Provider>
      </Router>
    </MobxProvider>
  )
}
