import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import "react-multi-carousel/lib/styles.css";

// images
import logo from "../../assets/logo.png";
import usdcIcon from "../../assets/png_usdc_56px@3x.png";
import usdtIcon from "../../assets/png_usdt_56px@3x.png";
import daiIcon from "../../assets/png_dai_56px@3x.png";
import wbtcIcon from "../../assets/png_wbtc_56px@3x.png";
import frenbtcIcon from "../../assets/png_frenbtc_56px@3x.png";
import crvrenwbtcIcon from "../../assets/png_crvrenwbtc_56px@3x.png";
import sushi from "../../assets/sushi_wbtc.svg";
import yearn from "../../assets/yearn.png";
import crv3 from "../../assets/3CRV.png";
import wbtc from "../../assets/eth_wbtc.svg";
import usdt from "../../assets/eth_usdt.svg";
import usdc from "../../assets/eth_usdc.svg";
import ethDai from "../../assets/eth_dai.svg";

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  background-color: ${(props) => props.theme.style.lightBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-size: 1.7rem;
  font-family: ${fonts.contentFont};
  padding:  1rem 1.5rem 0rem; 1.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
 
  

  .inner {
    overflow-x: scroll;
    height: 16rem;
    scrollbar-color: ${(props) => props.theme.style.scrollBarColor} ${(props) =>
  props.theme.style.lightBackground} ;
    scrollbar-width: thin;

    ::-webkit-scrollbar {
      width: 100%;
      height: .8rem;
      margin-top: -1.8rem
      
    }
    ::-webkit-scrollbar-track:no-button { 
      width: 100%;
      border-radius: .5rem;
      background-color: ${(props) => props.theme.style.lightBackground};
    }
    ::-webkit-scrollbar-button {
      color: ${(props) => props.theme.style.primaryFontColor};
      
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: black;
      background-color: ${(props) => props.theme.style.scrollBarColor};
   }

    .token-container {
      width: 180rem;
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      &.first {
        margin-bottom: 2rem;
      }
      
      @media(max-width: 1025px) {
        width: 90rem;
        
        
      }
      
      
    }
    @media(max-width: 1105px) {
      height: 18rem;
    }
    @media(max-width: 768px) {
      height: 20rem;
    }

    
    }
    

  h1 {
    font-family: ${fonts.headerFont};
    margin-bottom: 2.2rem;
    font-size: 2rem;
    text-align: center;
    position: relative;
  }

  
  

  
  
  @media(max-width: 1105px) {
    margin-bottom: 1.5rem;
    height: 32rem;
  }
 
  
`;

const tokens = [
  {
    name: "FARM",
    url: "https://harvestfi.github.io/add-farm/",
    image: logo,
  },
  {
    name: "fUSDC",
    url: "https://harvestfi.github.io/add-fusdc/",
    image: usdcIcon,
  },
  {
    name: "fUSDT",
    url: "https://harvestfi.github.io/add-fusdt/",
    image: usdtIcon,
  },
  {
    name: "fDAI",
    url: "https://harvestfi.github.io/add-fdai/",
    image: daiIcon,
  },
  {
    name: "fwBTC",
    url: "https://harvestfi.github.io/add-fwbtc/",
    image: wbtcIcon,
  },
  {
    name: "YCRV",
    url: "https://harvestfi.github.io/add-ycrv/",
    image: yearn,
  },
  {
    name: "3CRV",
    url: "https://harvestfi.github.io/add-3crv/",
    image: crv3,
  },
];
const tokens2 = [
  {
    name: "frenBTC",
    url: "https://harvestfi.github.io/add-frenbtc/",
    image: frenbtcIcon,
  },
  {
    name: "fcrvRenWBTC",
    url: "https://harvestfi.github.io/add-fcrvrenwbtc/",
    image: crvrenwbtcIcon,
  },
  {
    name: "SUSHI:WBTC-TBTC",
    url: "https://harvestfi.github.io/add-sushi/",
    image: sushi,
  },
  {
    name: "UNI:ETH-WBTC",
    url: "https://harvestfi.github.io/add-eth-wbtc/",
    image: wbtc,
  },
  {
    name: "UNI:ETH-USDT",
    url: "https://harvestfi.github.io/add-eth-usdt/",
    image: usdt,
  },
  {
    name: "UNI:ETH-USDCT",
    url: "https://harvestfi.github.io/add-eth-usdc/",
    image: usdc,
  },
  {
    name: "UNI:ETH-DAI",
    url: "https://harvestfi.github.io/add-eth-dai/",
    image: ethDai,
  },
];

const Token = ({ className, name, url, image }) => (
  <div className={className}>
    <a target="_blank" rel="noopener noreferrer" href={url}>
      <img alt={name} src={image}></img>
      <span>{name}</span>
    </a>
  </div>
);

const StyledToken = styled(Token)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 20%;
  

  &:hover {
    top: .2rem;
  }
  

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: ${(props) => props.theme.style.primaryFontColor};
    font-family: ${fonts.contentFont}
    font-size: 1.5rem;
  }

  img {
    height: 3.7rem;
    width: 3.7rem;
    margin-bottom: 0.5rem;
  }

 

  @media only screen and (max-width: 768px) {
    display: block;
    width: 50%;
    margin-bottom: 1.7rem;
  }
`;

const AddTokens = (props) => {
  return (
    <ThemeProvider
      theme={props.state.theme === "dark" ? darkTheme : lightTheme}
    >
      <Panel>
        <h1>Add assets to wallet</h1>
        <div className="inner">
          <div className="token-container first">
            {tokens.map((t) => (
              <StyledToken key={t.name} {...t} />
            ))}
          </div>
          <div className="token-container">
            {tokens2.map((t) => (
              <StyledToken key={t.name} {...t} />
            ))}
          </div>
        </div>
      </Panel>
    </ThemeProvider>
  );
};

export default AddTokens;
