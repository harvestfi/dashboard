import React, { useContext } from 'react';
import { Row, Col } from 'styled-bootstrap-grid';
import styled from 'styled-components';
import { fonts } from '../styles/appStyles';
import Harvest from './harvest/Harvest';
import AddTokens from './addTokens/AddTokens';
import FarmingTable from './farmingTable/FarmingTable';
import FarmInfo from './farmInfo/FarmInfo';
import AssetTable from './assetTable/AssetTable';
import HarvestContext from '../Context/HarvestContext';

const MainContent = ({ setState, openModal }) => {
  const { isCheckingBalance, state, personalGasSaved, personalGasSavedToCheck } = useContext(
    HarvestContext,
  );

  const savedGas = isCheckingBalance ? personalGasSavedToCheck : personalGasSaved;

  return (
    <Main>
      <Row>
        <Col>
          <FarmInfo savedGas={savedGas} />
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
        <Col>
          <FarmingTable />
        </Col>
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

      <AssetTable state={state} />
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
