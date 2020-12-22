import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import harvest from "../lib/index.js";
import detectEthereumProvider from "@metamask/detect-provider";
import { darkTheme, lightTheme, fonts } from "../styles/appStyles";

const { ethers } = harvest;

const WalletConnection = styled.div`
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  border-top-right-radius: 0rem;
  display: flex;
  padding: 0.75rem 1.25rem;
  background-color: ${(props) => props.theme.style.lightBackground};
  position: relative;
  top: -1.2rem;
  font-size: 1.2rem;
  font-family: "TechnaSans";

  a,
  a:visited,
  a:hover,
  a:active {
    color: ${(props) => props.theme.style.linkColor};
    text-decoration: none;
  }
`;
const WalletContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  color: ${(props) => props.theme.style.primaryFontColor};
`;
const WalletTab = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.style.lightBackground};
  border: ${(props) => props.theme.style.mainBorder};
  padding-bottom: 1.5rem;
  font-family: ${fonts.headerFont};
  font-size: 1.4rem;
`;

const Wallet = ({
  disconnect,
  refresh,
  setAddress,
  setConnection,
  openModal,
  state,
}) => {
  useEffect(() => {
    if (state.address !== "") {
      refresh(state);
    }
    // eslint-disable-next-line 
  }, [state.address]);

  const connectMetamask = (signer, manager) => {
    detectEthereumProvider().then((provider) => {
      if (!provider) {
        openModal(
          "No provider, please install a supported Web3 wallet.",
          "error",
        );
      } else {
        window.ethereum.enable().then(() => {
          setProvider(provider);
        });
      }
    });
  };

  const renderConnectStatus = (provider, address) => {
    if (!provider) {
      return (
        <div>
          <button
            className="button ghost"
            onClick={() => connectMetamask(provider)}
          >
            connect wallet to get started
          </button>
        </div>
      );
    }
    return (
      <p>
        <span id="address">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={address ? "https://etherscan.io/address/" + address : "#"}
          >
            {address || "not connected"}
          </a>
        </span>
      </p>
    );
  };

  const setProvider = async (provider) => {
    const ethersProvider = new ethers.providers.Web3Provider(provider);

    const signer = ethersProvider.getSigner();

    const manager = harvest.manager.PoolManager.allPastPools(
      signer ? signer : provider,
    );

    setConnection(provider, signer, manager);

    window.ethereum.on("accountsChanged", () => {
      disconnect();
    });

    // get the user address
    signer
      .getAddress() // refreshButtonAction called initially to load table
      .then((address) => {
        setAddress(address);
      });
  };

  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      <WalletContainer>
        <WalletTab>wallet</WalletTab>
        <WalletConnection>
          {renderConnectStatus(state.provider, state.address)}
        </WalletConnection>
      </WalletContainer>
    </ThemeProvider>
  );
};

export default Wallet;
