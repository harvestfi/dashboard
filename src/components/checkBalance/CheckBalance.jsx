import React, { useState, useContext, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Row, Col } from "styled-bootstrap-grid";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import harvest from "../../lib/index";

//COMPONENTS
import Wallet from "../Wallet";
import FarmingTable from "../farmingTable/FarmingTable";
import AssetTable from "../assetTable/AssetTable";

//CONTEXT
import HarvestContext from "../../Context/HarvestContext";

const { ethers } = harvest;

const CheckBalance = (props) => {
  const { state, setState } = useContext(HarvestContext);
  const [isChecking, setIsChecking] = useState(false);
  const [addressToCheck, setAddressToCheck] = useState("");

  const checkBalances = async (address) => {
    if (addressToCheck) {
      setIsChecking(true);
      const provider = window.web3.currentProvider;
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();
      const manager = harvest.manager.PoolManager.allPastPools(
        signer ? signer : provider,
      );
      manager
        .aggregateUnderlyings(addressToCheck)
        .then((underlying) => {
          return underlying.toList().filter((u) => !u.balance.isZero());
        })
        .then((underlyings) => {
          setState({ ...state, underlyings: underlyings });
        })
        .catch((err) => {
          console.log(err);
        });
      manager
        .summary(addressToCheck)
        .then((summaries) =>
          summaries.filter(
            (p) =>
              !p.summary.earnedRewards.isZero() ||
              !p.summary.stakedBalance.isZero() ||
              (p.summary.isActive && !p.summary.unstakedBalance.isZero()),
          ),
        )
        .then((summaries) => {
          let total = ethers.BigNumber.from(0);
          summaries.forEach((pos) => {
            total = total.add(pos.summary.usdValueOf);
          });
          setState((state) => ({
            ...state,
            summaries: summaries,
            usdValue: total,
          }));

          return summaries;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const changeHandler = (e) => {
    setAddressToCheck(e.target.value);
  };

  const clear = () => {
    setAddressToCheck("");
    setIsChecking(false);
  };

  return (
    <ThemeProvider
      theme={props.state.theme === "dark" ? darkTheme : lightTheme}
    >
      <Panel>
        {isChecking ? (
          ""
        ) : (
          <div className="read-only-header">
            <h1>Or enter a wallet address for read-only mode</h1>
            <div className="address-input">
              <input
                type="text"
                value={addressToCheck}
                placeholder="Enter address"
                onChange={changeHandler}
              />
            </div>
            {/* //address-input */}
          </div>
        )}

        {isChecking ? (
          ""
        ) : (
          <button
            onClick={() => checkBalances(addressToCheck)}
            className="check-all button"
          >
            Check Balance
          </button>
        )}
        {isChecking ? (
          <Row>
            <Col>
              <Wallet
                state={state}
                address={addressToCheck}
                provider={window.web3.currentProvider}
              />
            </Col>
          </Row>
        ) : null}

        {isChecking ? (
          <div className="read-only-tables">
            <FarmingTable state={state} />
            <AssetTable state={state} style={{ marginTop: "3rem" }} />
          </div>
        ) : (
          ""
        )}

        {isChecking ? (
          <button onClick={clear} className="clear button">
            Clear
          </button>
        ) : (
          ""
        )}
      </Panel>
    </ThemeProvider>
  );
};

export default CheckBalance;

const Panel = styled.div`
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem auto;
  background-color: ${(props) => props.theme.style.panelBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-size: 1.7rem;
  font-family: ${fonts.contentFont};
  padding:  1rem 1.5rem 0rem; 1.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
 
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
        border-radius: .5rem;
        font-size: 1.7rem;
        font-family: ${fonts.contentFont}
      }
  }

  .button {
    width: 12%;
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
  
  

  
  
  @media(max-width: 1105px) {
    margin-bottom: 1.5rem;
    height: 32rem;
  }
 
  
`;
