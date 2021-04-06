import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { Row, Col } from 'styled-bootstrap-grid';
import Loadable from 'react-loadable';
import axios from 'axios';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { TopTabs } from 'components';
import ModeSelectBoard from './components/ModeSelectBoard';
import HarvestContext from './Context/HarvestContext';
import harvest from './lib';
import { darkTheme, lightTheme } from './styles/appStyles';

// images
import logo from './assets/newLogo.png';
// styles
import { Topbar, GlobalStyle, Brand, Panel, Container } from './styles/AppJsStyles';

// components
import SettingsModal from './components/userSettings/SettingsModal';
import Radio from './components/radio/Radio';
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
  const [personalGasSaved, setPersonalGasSaved] = useState(0);
  // for read-only-mode
  const [personalGasSavedToCheck, setPersonalGasSavedToCheck] = useState(0);
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
    addressToCheck: '',
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
        let currentAPY = 0;
        if (res && res.data && res.data.eth && res.data.eth[0] && res.data.eth[0].rewardAPY) {
          currentAPY = res.data.eth[0].rewardAPY;
        }
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

  const refresh = useCallback(() => {
    setRefreshing(true);

    let address = '';

    if (isCheckingBalance) {
      address = state.addressToCheck;
    } else if (isConnecting) {
      address = state.address;
    } else {
      setRefreshing(false);
      return;
    }

    state.manager
      .aggregateUnderlyings(address)
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
      .summary(address)
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
        return Promise.all([state.manager.iFarmSummary(address), total, summaries]);
      })
      .then(([iFarmSummary, total, summaries]) => {
        if (iFarmSummary) {
          total = total.add(iFarmSummary.summary.usdValueOf);
          summaries.unshift(iFarmSummary);
        }
        setState(prevState => ({
          ...prevState,
          summaries,
          usdValue: total,
        }));
        setRefreshing(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [isCheckingBalance, isConnecting, state.address, state.addressToCheck, state.manager]);

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

  const getPersonalGasSaved = async (address, setGasInfo) => {
    address &&
      (await axios
        .get(
          `${process.env.REACT_APP_ETH_PARSER_URL}/total_saved_gas_fee_by_address?address=${address}`,
        )
        .then(res => {
          setGasInfo(Math.round(res.data.data));
        })
        .catch(err => {
          console.log(err);
        }));
  };
  // using state.address
  useEffect(() => {
    getPersonalGasSaved(state.address, setPersonalGasSaved);
  }, [state.address]);

  // using addressToCheck
  useEffect(() => {
    getPersonalGasSaved(addressToCheck, setPersonalGasSavedToCheck);
  }, [addressToCheck]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state.manager) {
        refresh();
      }
    }, 20000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (isConnecting) {
      refresh();
    }
  }, [isConnecting, refresh]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getPools();
    }, 20000);
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
    if (state.addressToCheck !== '') {
      refresh();
    }
    // eslint-disable-next-line
  }, [state.addressToCheck]);

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

  const setCheckingBalanceStatus = checking => {
    setState(prevState => ({
      ...prevState,
      summaries: [],
      underlyings: [],
      usdValue: 0,
      apy: 0,
      farmPrice: 0,
      totalFarmEarned: 0,
    }));
    setCheckingBalance(checking);
  };

  return (
    <HarvestContext.Provider
      value={{
        state,
        setState,
        personalGasSaved,
        personalGasSavedToCheck,
        radio,
        setRadio,
        toggleRadio,
        tokenAddedMessage,
        setTokenAddedMessage,
        isRefreshing,
        isConnecting,
        setIsConnecting,
        isCheckingBalance,
        setCheckingBalance: setCheckingBalanceStatus,
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
                    <TopTabs />
                    <Panel>
                      <Radio />

                      <TokenMessage />
                      <HarvestAndStakeMessage />

                      {state.provider ? (
                        <ModeSelectBoard state={state} setState={setState} openModal={openModal} />
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
          {state.provider && !isConnecting && (
            <Row>
              <Col style={{ marginTop: '3rem', marginBottom: '3rem' }}>
                {isCheckingBalance ? <TopTabs /> : ''}
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
