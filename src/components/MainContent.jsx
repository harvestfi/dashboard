import React, { useState, useContext, useEffect } from 'react';
import { Row, Col } from 'styled-bootstrap-grid';
import styled from 'styled-components';
import { fonts } from '../styles/appStyles';
import Harvest from './harvest/Harvest';
import AddTokens from './addTokens/AddTokens';
import FarmCardContainer from './farmCards/FarmCardGroupContainer';
import FarmingTable from './farmingTable/FarmingTable';
import FarmInfo from './farmInfo/FarmInfo';
import AssetTable from './assetTable/AssetTable';
import HarvestContext from '../Context/HarvestContext';

const MainContent = ({ setState, openModal }) => {
  const { isCheckingBalance, state } = useContext(HarvestContext);

  const [showTables, setShowTables] = useState(false);
  const showAsTables = () => {
    setShowTables(true);
    window.localStorage.setItem('HarvestFinance:Layout', 'tables');
  };
  const showAsCards = () => {
    setShowTables(false);
    window.localStorage.setItem('HarvestFinance:Layout', 'cards');
  };

  useEffect(() => {
    if (window.localStorage.getItem('HarvestFinance:Layout') === 'cards') {
      setShowTables(false);
    }
    if (window.localStorage.getItem('HarvestFinance:Layout') === 'tables') {
      setShowTables(true);
    }
  }, []);

  return (
    <Main>
      <Row>
        <Col>
          <FarmInfo />
        </Col>
      </Row>

      {isCheckingBalance ? (
        ''
      ) : (
        <Row style={{ marginTop: '15px' }}>
          {/* Git hub pages would not recognize the margin from the bootstrap grid */}
          <Col lg="12">
            <Harvest state={state} setState={setState} openModal={openModal} />
          </Col>
        </Row>
      )}
      <Row>
        {showTables ? (
          <Col>
            <FarmingTable state={state} setState={setState} showAsCards={showAsCards} />
          </Col>
        ) : (
          <Col>
            <FarmCardContainer state={state} setState={setState} showAsTables={showAsTables} />
          </Col>
        )}
      </Row>

      {isCheckingBalance ? (
        ''
      ) : (
        <Row style={{ marginTop: '15px' }}>
          {/* Git hub pages would not recognize the margin from the bootstrap grid */}
          <Col lg="12">
            <AddTokens state={state} />
          </Col>
        </Row>
      )}

      {showTables ? <AssetTable state={state} /> : ''}
    </Main>
  );
};

export default MainContent;

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
`;
