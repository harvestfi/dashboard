import React from "react";
import { Row, Col } from "styled-bootstrap-grid";
import styled from "styled-components";

import FarmTableSkeleton from "../components/farmingTable/FarmTableSkeleton.jsx";
import AssetTable from "../components/assetTable/AssetTable.jsx";
import Harvest from "../components/harvest/Harvest.jsx";
import StakePanel from "../components/stakePanel/StakePanel.jsx";
import Balance from "../components/balance/Balance.jsx";
import APY from "../components/apy/APY.jsx";
import FarmPrice from "../components/farmPrice/FarmPrice";
import AddTokens from "../components/addTokens/AddTokens";

import Loadable from "react-loadable";

const Main = styled.div`
  .farm-column {
    ::-webkit-scrollbar {
      height: 20rem;
    }
  }
`;

const MainContent = ({ state, setState, openModal }) => {
  const FarmingTable = Loadable({
    loader: () => import("./farmingTable/FarmingTable"),
    loading() {
      return <FarmTableSkeleton state={state} />;
    },
  });
  return (
    <Main className="main-content">
      <Row className="farm-column">
        <Col>
          <FarmingTable state={state} setState={setState} />
        </Col>
      </Row>

      <Row style={{ marginTop: "15px" }}>
        {/* Git hub pages would not recognize the margin from the bootstrap grid */}
        <Col lg="6">
          <Harvest state={state} setState={setState} openModal={openModal} />
        </Col>
        <Col lg="4">
          <StakePanel state={state} openModal={openModal} />
        </Col>
        <Col lg="2">
          <Balance state={state} />
        </Col>
      </Row>
      <Row style={{ marginTop: "15px" }}>
        {/* Git hub pages would not recognize the margin from the bootstrap grid */}

        <Col lg="10">
          <AddTokens state={state} />
        </Col>
        <Col lg="2">
          <APY apy={state.apy} display={state.display} theme={state.theme} />
          <FarmPrice
            price={state.farmPrice}
            display={state.display}
            theme={state.theme}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "15px" }}>
        <Col lg="12">
          <AssetTable state={state} />
        </Col>
      </Row>
    </Main>
  );
};

export default MainContent;
