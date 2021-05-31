import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { ethers } from 'ethers'

import { Row, Col } from 'styled-bootstrap-grid'
import { motion } from 'framer-motion'
import { fonts } from '../../styles/appStyles'

// COMPONENTS
import { MainContent } from '../MainContent'
import Radio from '../radio/Radio'
import Wallet from '../Wallet'

// CONTEXT
import { HarvestContext } from '../../Context/HarvestContext'

import { EthereumService } from '@/services/EthereumService'
import { BSCService } from '@/services/BSCService'

const CheckBalance = () => {
  const {
    state,
    isCheckingBalance,
    setCheckingBalance,
    setWalletAddressToCheck,
    walletAddressToCheck,
    setAssetsToCheck,
    setShowAssetsToCheck,
    setRadio,
  } = useContext(HarvestContext)

  const [validationMessage, setValidationMessage] = useState('')

  const [addressFromChangeEvent, setAddressFromChangeEvent] = useState('')

  const validateAddress = (address) => {
    try {
      ethers.utils.getAddress(address)
    } catch (e) {
      return false
    }
    return true
  }

  const changeHandler = (e) => {
    setAddressFromChangeEvent(e.target.value)
  }

  const setCheck = async () => {
    if (addressFromChangeEvent && validateAddress(addressFromChangeEvent)) {
      setCheckingBalance(true)

      setWalletAddressToCheck(addressFromChangeEvent)


      const [ethereumAssetsToCheck, BSCAssetsToCheck] = await Promise.all([
        EthereumService.getAssets(addressFromChangeEvent),
        BSCService.getAssets(addressFromChangeEvent),
      ])

      setAssetsToCheck([...ethereumAssetsToCheck, ...BSCAssetsToCheck])
      setShowAssetsToCheck(true)
    } else {
      setValidationMessage('You must enter a valid address')
    }
  }
  const disconnect = () => {
    setRadio(false)
    setCheckingBalance(false)
    setShowAssetsToCheck(false)
    setAssetsToCheck([])
    setWalletAddressToCheck('')
  }

  return (
    <>
      {validationMessage ? (
        <motion.div
          key={validationMessage}
          initial={{ x: 0, y: -100, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ x: 0, y: -100, opacity: 1 }}
        >
          <ValidationMessage className="validation-message">
            <p>{validationMessage}</p>
          </ValidationMessage>
        </motion.div>
      ) : null}

      <Panel>
        {isCheckingBalance ? <Radio /> : ''}
        {isCheckingBalance ? (
          <Row>
            <Col>
              <Wallet
                buttonText="Clear"
                address={walletAddressToCheck}
                provider={state.provider}
                setAddress={setWalletAddressToCheck}
                disconnect={disconnect}
              />
            </Col>
          </Row>
        ) : null}
        {isCheckingBalance ? (
          ''
        ) : (
          <div className="read-only-header">
            <h1>Or enter a wallet address for read-only mode</h1>
            <div className="address-input">
              <input
                type="text"
                value={addressFromChangeEvent}
                placeholder="Enter address"
                onChange={changeHandler}
              />
            </div>
            {/* //address-input */}
          </div>
        )}

        {isCheckingBalance ? (
          ''
        ) : (
          <button
            onClick={() => setCheck()}
            className="check-all button"
            type="button"
          >
            Check Balance
          </button>
        )}
        {isCheckingBalance ? <MainContent /> : null}
      </Panel>
    </>
  )
}
export default CheckBalance
const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem auto;
  background-color: ${(props) => props.theme.style.panelBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-size: 1.7rem;
  font-family: ${fonts.contentFont};
  padding: 1rem 1.5rem 0rem 1.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  z-index: 1;
  position: relative;

  h1 {
    font-family: ${fonts.headerFont};
    margin-bottom: 2.2rem;
    font-size: 2.5rem;
    text-align: center;
    position: relative;
  }
  .address-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      width: 30%;
      text-align: center;
      border-radius: 0.5rem;
      font-size: 1.7rem;
      font-family: ${fonts.contentFont};
    }
  }
  .button {
    width: max-content;
    margin: 2rem auto 2rem auto;
    font-size: 2rem;
    font-family: ${fonts.headerFont};
    position: relative;
    &:hover {
      top: 1.5px;
    }
  }
  .check-all {
    position: relative;
    &:hover {
      top: 1.5px;
    }
  }
  .clear {
    position: relative;
    z-index: 400;
  }
`
const ValidationMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  background-color: ${(props) => props.theme.style.lightBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-family: ${fonts.contentFont};
  font-size: 2rem;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  margin: -5rem auto 0 auto;
  position: absolute;
  left: 0%;
  right: 0%;
  @media (max-width: 768px) {
    left: 30%;
    right: 30%;
  }
  p {
    text-align: center;
  }
`
