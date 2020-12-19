import React, { useEffect, useContext } from "react";
import HarvestContext from "../../Context/HarvestContext";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";

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
    symbol: "FARM",
    url: "https://harvestfi.github.io/add-farm/",
    image: logo,
    address: "0xa0246c9032bC3A600820415aE600c6388619A14D",
    decimals: 18,
    tokenImage:
      "http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/tractor.png",
  },
  {
    name: "fUSDC",
    symbol: "fUSDC",
    url: "https://harvestfi.github.io/add-fusdc/",
    image: usdcIcon,
    address: "0xc3f7ffb5d5869b3ade9448d094d81b0521e8326f",
    decimals: 18,
    tokenImage:
      "https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png",
  },
  {
    name: "fUSDT",
    symbol: "fUSDT",
    url: "https://harvestfi.github.io/add-fusdt/",
    image: usdtIcon,
    address: "0x053c80eA73Dc6941F518a68E2FC52Ac45BDE7c9C",
    decimals: 18,
    tokenImage: `https://dvh1deh6tagwk.cloudfront.net/finder-us/wp-uploads/sites/107/2018/03/featured-image-how-to-buy-tether.png`,
  },
  {
    name: "fDAI",
    symbol: "fDAI",
    url: "https://harvestfi.github.io/add-fdai/",
    image: daiIcon,
    address: "0x5d9d25c7C457dD82fc8668FFC6B9746b674d4EcB",
    decimals: 18,
    tokenImage:
      "https://dvh1deh6tagwk.cloudfront.net/finder-us/wp-uploads/2018/10/dai-featured.jpg",
  },
  {
    name: "fwBTC",
    symbol: "fwBTC",
    url: "https://harvestfi.github.io/add-fwbtc/",
    image: wbtcIcon,
    address: "0x5d9d25c7C457dD82fc8668FFC6B9746b674d4EcB",
    decimals: 8,
    tokenImage: "https://harvest.finance/icons/wbtc.png",
  },
  {
    name: "yCRV",
    symbol: "yCRV",
    image: yearn,
    address: "0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8",
    decimals: 18,
    tokenImage:
      "https://cryptotips.eu/wp-content/uploads/2020/09/yearn-finance-review.png",
  },
  {
    name: "3CRV",
    symbol: "3CRV",
    image: crv3,
    address: "0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490",
    decimals: 18,
    tokenImage:
      "https://assets.coingecko.com/coins/images/12972/large/3pool_128.png?1603948039",
    url: "https://harvestfi.github.io/add-3crv/",
  },
];
const tokens2 = [
  {
    name: "frenBTC",
    symbol: "frBTC",
    image: frenbtcIcon,
    address: "0xC391d1b08c1403313B0c28D47202DFDA015633C4",
    decimals: 18,
    tokenImage: `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png`,
  },
  {
    name: "fcrvRenWBTC",
    symbol: "fcrBTC",
    image: crvrenwbtcIcon,
    address: "0x9aA8F427A17d6B0d91B6262989EdC7D45d6aEdf8",
    decimals: 18,
    tokenImage: "https://s2.coinmarketcap.com/static/img/coins/200x200/1.png",
  },
  {
    name: "SUSHI:WBTC-TBTC",
    symbol: "SLP",
    image: sushi,
    address: "0x2dbc7dd86c6cd87b525bd54ea73ebeebbc307f68",
    decimals: 18,
    tokenImage: "https://i.imgur.com/gwqGnbQ.png",
  },
  {
    name: "UNI:ETH-WBTC",
    symbol: "UNI-V2",
    image: wbtc,
    address: "0xbb2b8038a1640196fbe3e38816f3e67cba72d940",
    decimals: 18,
    tokenImage:
      "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/WBTC.png",
  },
  {
    name: "UNI:ETH-USDT",
    symbol: "UNI-V2",
    image: usdt,
    address: "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852",
    decimals: 18,
    tokenImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRCkQTiQYu96O4y0abjjMw4GaonZw1g1I95Qg&usqp=CAU",
  },
  {
    name: "UNI:ETH-USDCT",
    symbol: "UNI-V2",
    image: usdc,
    address: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
    decimals: 18,
    tokenImage: "https://www.centre.io/images/usdc/usdc-icon-86074d9d49.png",
  },
  {
    name: "UNI:ETH-DAI",
    symbol: "UNI-V2",
    image: ethDai,
    address: "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
    decimals: 18,
    tokenImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA1CpdQQxENdYdzlXdQhPj2sNqoVqtK5AQFQ&usqp=CAU",
  },
];

const StyledToken = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 20%;

  &:hover {
    top: 0.2rem;
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: ${(props) => props.theme.style.primaryFontColor};
    font-family: ${fonts.contentFont};
  }

  img {
    height: 3.7rem;
    width: 3.7rem;
    margin-bottom: 0.5rem;
  }
  span {
    font-size: 1.5rem;
  }
`;

const AddTokens = (props) => {
  const { tokenAddedMessage, setTokenAddedMessage } = useContext(
    HarvestContext,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTokenAddedMessage("");
    }, 1500);
    return () => clearTimeout(timer);
  }, [tokenAddedMessage]);

  const addTokenToWallet = (t) => {
    setTokenAddedMessage("");

    props.state.provider.sendAsync(
      {
        method: "metamask_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: t.address,
            symbol: t.symbol,
            decimals: t.decimals,
            image: t.tokenImage,
          },
        },
        id: Math.round(Math.random() * 100000),
      },
      (err, result) => {
        if (err) {
          setTokenAddedMessage(
            `An error has occurred, ${t.name} could not be added.`,
          );
        } else {
          if (result.result) {
            setTokenAddedMessage(`${t.name} was added to wallet!`);
          } else {
            setTokenAddedMessage(`${t.name} has not been added to wallet.`);
          }
        }
      },
    );
  };

  return (
    <ThemeProvider
      theme={props.state.theme === "dark" ? darkTheme : lightTheme}
    >
      <Panel>
        <h1>Add assets to wallet</h1>
        <div className="inner">
          <div className="token-container first">
            {tokens.map((t) => (
              <StyledToken
                onClick={() => addTokenToWallet(t)}
                key={t.name}
                {...t}
              >
                <img alt={t.name} src={t.image}></img>
                <span>{t.name}</span>
              </StyledToken>
            ))}
          </div>
          <div className="token-container">
            {tokens2.map((t) => (
              <StyledToken
                onClick={() => addTokenToWallet(t)}
                key={t.name}
                {...t}
              >
                <img alt={t.name} src={t.image}></img>
                <span>{t.name}</span>
              </StyledToken>
            ))}
          </div>
        </div>
      </Panel>
    </ThemeProvider>
  );
};

export default AddTokens;
