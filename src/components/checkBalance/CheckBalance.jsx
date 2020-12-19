import React, { useState, useContext, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Row, Col } from "styled-bootstrap-grid";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import harvest from "../../lib/index";
import { motion } from "framer-motion";

//COMPONENTS
import MainContent from "../MainContent";
import Radio from "../radio/Radio";

//CONTEXT
import HarvestContext from "../../Context/HarvestContext";

const { ethers } = harvest;

const CheckBalance = (props) => {
  const {
    state,
    setState,
    setConnection,
    isCheckingBalance,
    setCheckingBalance,
    setTokenAddedMessage,
  } = useContext(HarvestContext);
  const [validationMessage, setValidationMessage] = useState("");
  const [addressToCheck, setAddressToCheck] = useState("");

  const checkBalances = async (address) => {
    if (validateAddress(addressToCheck)) {
      setAddressToCheck("");
      setCheckingBalance(true);
      const provider = window.web3.currentProvider;
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();
      const manager = harvest.manager.PoolManager.allPastPools(
        signer ? signer : provider,
      );
      setConnection(provider, signer, manager);
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
    setCheckingBalance(false);
  };

  const setCheck = (address) => {
    if (address && validateAddress(addressToCheck)) {
      setCheckingBalance(true);
      checkBalances(address);
    } else {
      setAddressToCheck("");
      setValidationMessage("You must enter a valid address");
      const timer = setTimeout(() => {
        setValidationMessage("");
      }, 2500);
      return () => clearTimeout(timer);
    }
  };

  const validateAddress = (address) => {
    try {
      ethers.utils.getAddress(address);
    } catch (e) {
      return false;
    }
    return true;
  };

  return (
    <ThemeProvider
      theme={props.state.theme === "dark" ? darkTheme : lightTheme}
    >
      <>
        {validationMessage ? (
          <motion.div
            key={validationMessage}
            initial={{ x: 0, y: -100, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ x: 0, y: -100, opacity: 1 }}
          >
            <div className="token-added-message">
              <p>{validationMessage}</p>
            </div>
          </motion.div>
        ) : null}
      </>

      <Panel>
        <Radio />
        {isCheckingBalance ? (
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

        {isCheckingBalance ? (
          ""
        ) : (
          <button
            onClick={() => setCheck(addressToCheck)}
            className="check-all button"
          >
            Check Balance
          </button>
        )}
        {isCheckingBalance ? <MainContent state={state} /> : null}
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
        border-radius: .5rem;
        font-size: 1.7rem;
        font-family: ${fonts.contentFont}
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
  
  

  
  
  @media(max-width: 1105px) {
    margin-bottom: 1.5rem;
    height: 32rem;
  }

  .validation-message {
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
    background-color: ${(props) => props.theme.style.lightBackground};
    color: ${(props) => props.theme.style.primaryFontColor};
    font-family: ${fonts.contentFont};
    font-size: 2rem;
    padding: 1rem 2rem;
    border-radius: .5rem;
    border: ${(props) => props.theme.style.mainBorder};
    box-shadow: ${(props) => props.theme.style.panelBoxShadow};
    margin: -5rem auto 0 auto;
    position: absolute;
    left: 0%;
    right: 0%;
    @media(max-width: 768px) {
      left: 30%;
      right: 30%;
    }

    p {
      text-align: center;
    }

    }

    }
 
  
`;
