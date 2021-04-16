import React, { useContext } from 'react';
import { Row, Col } from 'styled-bootstrap-grid';
import styled from 'styled-components';
import { fonts } from '../styles/appStyles';
import Harvest from './harvest/Harvest';
import AddTokens from './addTokens/AddTokens';
import Wallet from './Wallet';
import FarmingTable from './farmingTable/FarmingTable';
import FarmInfo from './farmInfo/FarmInfo';
import HarvestContext from '../Context/HarvestContext';

const MainContent = ({ setState }) => {
  const { isCheckingBalance, state } = useContext(HarvestContext);

  return (
    <Main>
      {!isCheckingBalance && (
        <Row>
          <Col>
            <Wallet theme={state.theme} address={state.address} provider={state.provider} />
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <FarmInfo />
        </Col>
      </Row>

      {!isCheckingBalance && (
        <Row style={{ marginTop: '15px' }}>
          {/* Git hub pages would not recognize the margin from the bootstrap grid */}
          <Col lg="12">
            <Harvest state={state} setState={setState} />
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <FarmingTable />
        </Col>
      </Row>

      {!isCheckingBalance && (
        <Row style={{ marginTop: '15px' }}>
          {/* Git hub pages would not recognize the margin from the bootstrap grid */}
          <Col lg="12">
            <AddTokens state={state} />
          </Col>
        </Row>
      )}
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
