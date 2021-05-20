import React, { useContext, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { HarvestContext } from '../Context/HarvestContext'
import { fonts } from '../styles/appStyles'

const WelcomeTextPanel = styled.div`
  width: 98%;
  margin: 0 auto;
  position: relative;
  padding: 2.5rem 2.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 1rem;
  border-top-left-radius: 0.5rem;
  background-color: ${(props) => props.theme.style.panelBackground};
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 1.6rem;
  color: ${(props) => props.theme.style.primaryFontColor};

  h1 {
    font-size: 2.8rem;
    font-family: ${fonts.headerFont};
    margin: 1rem 0;
  }
  h4 {
    font-size: 2rem;
    font-family: ${fonts.contentFont};
    margin: 1rem 0;
  }
  h6 {
    font-family: ${fonts.headerFont};
    width: 60%;
    margin: 1rem auto;
    font-family: ${fonts.contentFont};
    font-size: 1.2rem;
  }
  button {
    font-size: 2.2rem;
    font-family: ${fonts.headerFont};
    margin: 1rem 0;
    position: relative;
    &:hover {
      top: 1.5px;
    }
  }
  .foot-note {
    font-family: ${fonts.contentFont};
    width: 25%;
    margin: 1rem auto;
    line-height: 1.8rem;
    font-size: 1.1rem;
  }
  @media (max-width: 1100px) {
    .foot-note {
      width: 50%;
    }
  }

  @media (max-width: 600px) {
    .foot-note {
      width: 50%;
    }
  }
`

export const WelcomeText = ({
  disconnect,
  setAddress,
  setConnection,
  openModal,
}) => {
  const {
    setIsConnecting,
    setCheckingBalance,
    web3Modal,
    isConnecting,
  } = useContext(HarvestContext)

  const setProvider = useCallback(
    async (provider) => {
      const ethersProvider = new ethers.providers.Web3Provider(provider)

      const signer = ethersProvider.getSigner()

      setConnection(provider)

      window.ethereum.on('accountsChanged', () => {
        disconnect()
      })

      // get the user address
      signer
        .getAddress() // refreshButtonAction called initially to load table
        .then((address) => {
          setAddress(address)
        })
        .catch((_error) => {
          openModal('Something has gone wrong, retrying...', 'error')
        })
    },
    [disconnect, openModal, setAddress, setConnection],
  )

  const connectMetamask = useCallback(() => {
    setIsConnecting(false)
    setCheckingBalance(false)
    web3Modal
      .connect()
      .then((provider) => {
        if (!provider) {
          openModal(
            'No provider, please install a supported Web3 wallet.',
            'error',
          )
        } else {
          window.ethereum
            .enable()
            .then((_res) => {
              setProvider(provider)
            })
            .catch((err) => {
              console.log(err)
              openModal('Something has gone wrong, retrying...', 'error')
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [openModal, setCheckingBalance, setIsConnecting, setProvider, web3Modal])

  useEffect(() => {
    if (web3Modal.cachedProvider) connectMetamask()
  }, [connectMetamask, web3Modal.cachedProvider])

  return (
    <WelcomeTextPanel>
      <h1>Harvest Finance Dashboard</h1>
      <h4>Connect a wallet to get started</h4>
      {!isConnecting && (
        <button
          className="button"
          onClick={() => connectMetamask()}
          type="button"
        >
          Connect Wallet
        </button>
      )}
      <h6 className="foot-note">
        You will need a web3 wallet such as metamask to access this application.
      </h6>
    </WelcomeTextPanel>
  )
}
