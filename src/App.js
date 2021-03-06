import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Row, Col } from 'styled-bootstrap-grid';
import Loadable from 'react-loadable';
import axios from 'axios';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import HarvestContext from './Context/HarvestContext';
import harvest from './lib';
import { darkTheme, lightTheme } from './styles/appStyles';

// images
import logo from './assets/gif_tractor.gif';
// styles
import { Topbar, GlobalStyle, Brand, Panel, Container } from './styles/AppJsStyles';

// components
import TabContainer from './components/tabContainer/TabContainer';
import SettingsModal from './components/userSettings/SettingsModal';
import Radio from './components/radio/Radio';
import MainContent from './components/MainContent';
import WelcomeText from './components/WelcomeText';
import CheckBalance from './components/checkBalance/CheckBalance';
import TokenMessage from './components/statusMessages/TokenMessage';
import HarvestAndStakeMessage from './components/statusMessages/HarvestAndStakeMessage';
import Sidedrawer from './components/userSettings/sidedrawer/Sidedrawer';

const { ethers } = harvest;

const web3Modal = new Web3Modal({
  network: 'mainnet', // optional
  cacheProvider: false, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: `${process.env.REACT_APP_INFURA_KEY}`, // required
      },
    },
  },
});

const ErrorModal = Loadable({
  loader: () => import('./components/ErrorModal'),
  loading() {
    return null;
  },
});

function App() {
  // for currency conversion
  const [baseCurrency, setBaseCurrency] = useState(
    window.localStorage.getItem('HarvestFinance:currency') || 'USD',
  );
  const [exchangeRates, setExchangeRates] = useState({});
  const [currentExchangeRate, setCurrentExchangeRate] = useState(1);
  // for currency conversion
  const [openDrawer, setOpenDrawer] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isCheckingBalance, setCheckingBalance] = useState(false);
  const [tokenAddedMessage, setTokenAddedMessage] = useState('');
  const [harvestAndStakeMessage, setHarvestAndStakeMessage] = useState({
    first: '',
    second: '',
  });
  const [addressToCheck, setAddressToCheck] = useState('');
  const [state, setState] = useState({
    provider: undefined,
    signer: undefined,
    manager: undefined,
    address: '',
    summaries: [],
    underlyings: [],
    usdValue: 0,
    error: { message: null, type: null, display: false },
    theme: window.localStorage.getItem('HarvestFinance:Theme'),
    display: false,
    minimumHarvestAmount: '0',
    apy: 0,
    farmPrice: 0,
    totalFarmEarned: 0,
  });

  const getPools = async () => {
    await axios
      .get(`https://api-ui.harvest.finance/pools?key=${process.env.REACT_APP_HARVEST_KEY}`)
      .then(res => {
        const currentAPY = res.data[0].rewardAPY;
        setState(prevState => ({ ...prevState, apy: currentAPY }));
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(
        `${process.env.REACT_APP_ETH_PARSER_URL}/price/token/0xa0246c9032bC3A600820415aE600c6388619A14D`,
      )
      .then(res => {
        const farmPrice = res.data.data;
        setState(prevState => ({ ...prevState, farmPrice }));
      });
  };

  const refresh = () => {
    setRefreshing(true);
    state.manager
      .aggregateUnderlyings(state.address)
      .then(underlying => {
        return underlying.toList().filter(u => !u.balance.isZero());
      })
      .then(underlyings => {
        setState(prevState => ({ ...prevState, underlyings }));
      })
      .catch(err => {
        console.log(err);
      });

    state.manager
      .summary(state.address)
      .then(summaries =>
        summaries.filter(
          p =>
            !p.summary.earnedRewards.isZero() ||
            !p.summary.stakedBalance.isZero() ||
            (p.summary.isActive && !p.summary.unstakedBalance.isZero()),
        ),
      )
      .then(summaries => {
        let total = ethers.BigNumber.from(0);
        summaries.forEach(pos => {
          total = total.add(pos.summary.usdValueOf);
        });
        setState(prevState => ({
          ...prevState,
          summaries,
          usdValue: total,
        }));
        setRefreshing(false);

        return summaries;
      })
      .catch(() => {
        refresh();
      });
  };

  const memoizeExchangeRates = () => {
    axios
      .get('https://api.ratesapi.io/api/latest?base=USD')
      .then(res => {
        setExchangeRates(res.data.rates);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state.manager) {
        refresh();
      }
    }, 60000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      getPools();
    }, 60000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    getPools();
    memoizeExchangeRates();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      memoizeExchangeRates();
    }, 600000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (state.address !== '') {
      refresh();
    }
    // eslint-disable-next-line
  }, [state.address]);
  useEffect(() => {
    if (state.usdValue) {
      setState(prevState => ({ ...prevState, display: true }));
    }
    // eslint-disable-next-line
  }, [state.usdValue]);

  const disconnect = () => {
    setState(prevState => ({
      ...prevState,
      provider: undefined,
      signer: undefined,
      manager: undefined,
      address: '',
      summaries: [],
      underlyings: [],
      usdValue: 0,
      apy: 0,
      farmPrice: 0,
      totalFarmEarned: 0,
      error: { message: null, type: null, display: false },
      theme: window.localStorage.getItem('HarvestFinance:Theme'),
    }));
    setIsConnecting(false);
    web3Modal.clearCachedProvider();
  };

  const closeErrorModal = () => {
    setState(prevState => ({
      ...prevState,
      error: { message: null, type: null, display: false },
    }));
  };

  const openModal = (message, type) => {
    setState(prevState => ({
      ...prevState,
      error: { message, type, display: true },
    }));
  };

  const toggleUserSettings = () => {
    setSettingsOpen(!settingsOpen);
  };
  const toggleSideDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const setConnection = (provider, signer, manager) => {
    setState(prevState => ({
      ...prevState,
      provider,
      signer,
      manager,
    }));
  };

  const setAddress = address => {
    setState(prevState => ({ ...prevState, address }));
  };

  // Radio Modal
  const [radio, setRadio] = useState(false);

  const toggleRadio = () => {
    setRadio(!radio);
  };

  // currency conversion helpers
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: baseCurrency,
  });

  const prettyBalance = balance => {
    return currencyFormatter.format(balance / 1000000);
  };
  const convertStandardNumber = num => {
    return num ? currencyFormatter.format(num) : '$0.00';
  };

  return (
    <HarvestContext.Provider
      value={{
        state,
        setState,
        radio,
        setRadio,
        toggleRadio,
        tokenAddedMessage,
        setTokenAddedMessage,
        isRefreshing,
        isConnecting,
        setIsConnecting,
        isCheckingBalance,
        setCheckingBalance,
        setConnection,
        disconnect,
        refresh,
        harvestAndStakeMessage,
        setHarvestAndStakeMessage,
        exchangeRates,
        baseCurrency,
        setBaseCurrency,
        currentExchangeRate,
        setCurrentExchangeRate,
        currencyFormatter,
        prettyBalance,
        convertStandardNumber,
        settingsOpen,
        toggleUserSettings,
        openDrawer,
        toggleSideDrawer,
        web3Modal,
        addressToCheck,
        setAddressToCheck,
        getPools,
      }}
    >
      <ThemeProvider theme={state.theme === 'dark' ? darkTheme : lightTheme}>
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
                {isCheckingBalance ? (
                  ''
                ) : (
                  <>
                    <TabContainer />
                    <Panel>
                      <Radio />

                      <TokenMessage />
                      <HarvestAndStakeMessage />

                      {/* MOVED MAIN COMPONENTS INTO ITS OWN COMPONENT */}
                      {/* The welcome text display on intial load and when a wallet is connected the main content renders */}
                      {state.provider ? (
                        <MainContent state={state} setState={setState} openModal={openModal} />
                      ) : (
                        <Row>
                          <Col>
                            <WelcomeText
                              state={state}
                              openModal={openModal}
                              disconnect={disconnect}
                              setConnection={setConnection}
                              setAddress={setAddress}
                              refresh={refresh}
                            />
                          </Col>
                        </Row>
                      )}
                    </Panel>
                  </>
                )}
              </>
            </Col>
          </Row>
          {isConnecting ? (
            ''
          ) : (
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
  );
}

export default App;
