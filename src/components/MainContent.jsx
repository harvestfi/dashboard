import React, { useContext, useEffect, useState } from 'react'
import { Row, Col } from 'styled-bootstrap-grid'
import styled from 'styled-components'
import { fonts } from '../styles/appStyles'
import Harvest from './harvest/Harvest'
import AddTokens from './addTokens/AddTokens'
import Wallet from './Wallet'
import { FarmingTable } from './farmingTable/FarmingTable'
import { FarmInfo } from './farmInfo/FarmInfo'
import { HarvestContext } from '../Context/HarvestContext'
import { API } from '@/api'

// TODO split into two pages: user page and check balance page
export const MainContent = ({ setState }) => {
  const {
    isCheckingBalance,
    state,
    userAssets,
    assetsToCheck,
    userWalletAddress,
    setUserWalletAddress,
    showUserAssets,
    showAssetsToCheck,
    disconnect,
    currentExchangeRate,
    walletAddressToCheck,
    baseCurrency,
  } = useContext(HarvestContext)

  const [personalGasSavedInfo, setPersonalGasSavedInfo] = useState(0)

  const assets = isCheckingBalance ? assetsToCheck : userAssets

  const walletAddress = isCheckingBalance
    ? walletAddressToCheck
    : userWalletAddress

  useEffect(() => {
    const getPersonalGasSaved = async () => {
      const gas = await API.getPersonalGasSaved(walletAddress)
      setPersonalGasSavedInfo(gas)
    }
    getPersonalGasSaved()
  }, [walletAddress])

  return (
    <Main>
      {!isCheckingBalance && (
        <Row>
          <Col>
            <Wallet
              buttonText="Disconnect"
              address={userWalletAddress}
              provider={state.provider}
              setAddress={setUserWalletAddress}
              disconnect={disconnect}
            />
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <FarmInfo assets={assets} savedGas={personalGasSavedInfo} />
        </Col>
      </Row>

      {/* {!isCheckingBalance && ( // // TODO: return this buttons and fixed their
				<Row style={{ marginTop: '15px' }}>
					{/* Git hub pages would not recognize the margin from the bootstrap grid */}
      {/* <Col lg="12"> 
						<Harvest state={state} setState={setState} />
					</Col>
				</Row>
			)} */}
      {isCheckingBalance ? (
        <Row>
          <Col>
            <FarmingTable
              currentExchangeRate={currentExchangeRate}
              display={showAssetsToCheck}
              assets={assets}
              baseCurrency={baseCurrency}
            />
          </Col>
        </Row>
      ) : (
        <Col>
          <FarmingTable
            currentExchangeRate={currentExchangeRate}
            display={showUserAssets}
            assets={assets}
            baseCurrency={baseCurrency}
          />
        </Col>
      )}

      {!isCheckingBalance && (
        <Row style={{ marginTop: '15px' }}>
          {/* Git hub pages would not recognize the margin from the bootstrap grid */}
          <Col lg="12">
            <AddTokens state={state} />
          </Col>
        </Row>
      )}
    </Main>
  )
}

const Main = styled.div`
  .farm-info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  @media (max-width: 1107px) {
    .farm-info {
      display: flex;
      flex-direction: column-reverse;
    }
  }
  .button-div {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    .clear {
      position: relative;
      z-index: 400;
    }
  }
`
