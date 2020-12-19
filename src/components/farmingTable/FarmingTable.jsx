import React, { useEffect, useContext } from "react";
import HarvestContext from "../../Context/HarvestContext";
import DataTable from "react-data-table-component";
import styled, { ThemeProvider } from "styled-components";
import harvest from "../../lib/index";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";

import FarmTableSkeleton from "./FarmTableSkeleton";

const { utils, ethers } = harvest;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%:
  padding-bottom: 3rem;
  border: ${(props) => props.theme.style.mainBorder};
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  color: ${(props) => props.theme.style.primaryFontColor};
  background-color: ${(props) => props.theme.style.lightBackground};
  border-radius: .5rem;
  border-top-left-radius: 0rem;
  position: relative;
  z-index: 50;
 
  
  div[role="table"] {
    width: 99%;
    height: 100%
    background-color: ${(props) => props.theme.style.lightBackground}
    padding: .35rem;
    
    scrollbar-width: thin;
    scrollbar-color: ${(props) => props.theme.style.scrollBarColor} ${(props) =>
  props.theme.style.lightBackground} ;
    ::-webkit-scrollbar {
      width: .1rem;
    }
}
.rdt_TableHeadRow {
    
  border-bottom: ${(props) => props.theme.style.mainBorder};
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  background-color: ${(props) => props.theme.style.lightBackground};
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
}
.rdt_TableBody {
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: .5rem;
  border-bottom-right-radius: .5rem;
}
.rdt_TableRow {
  background-color: ${(props) => props.theme.style.lightBackground};
  font-family: ${fonts.contentFont};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-size: 1.5rem;
  
  @media(max-width: 1090px) {
    font-size: 1.2rem;
    
  }
  @media(max-width: 760px) {
    font-size: 1.5rem;
    
  }
  @media(max-width: 330px) {
    font-size: .9rem;
  }
}
div[role="columnheader"] {
  color: ${(props) => props.theme.style.primaryFontColor};
  background-color: ${(props) => props.theme.style.lightBackground};
  font-family: ${fonts.headerFont};
  font-size: 1.7rem;
  letter-spacing: -1.5px;
  
  
  &:hover,
  &:visited,
  &:active,
  &:focus {
    color: ${(props) => props.theme.style.primaryFontColor};
  }
}
  
  
  
`;

const MainTableInner = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow-x: scroll;
  scrollbar-color: ${(props) => props.theme.style.scrollBarColor}
    ${(props) => props.theme.style.lightBackground};
  scrollbar-width: thin;
  ::-webkit-scrollbar {
    width: 100%;
    height: 0.8rem;
    margin-top: -1.8rem;
  }
  ::-webkit-scrollbar-track:no-button {
    width: 100%;
    border-radius: 0.5rem;
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
`;
const MainTableRow = styled.div`
  display: grid;
  grid-template-columns: 0.75fr 0.5fr 0.75fr 0.75fr 0.75fr 0.75fr 0.5fr;
  font-size: 1.7rem;
  font-family: ${fonts.contentFont};
  padding: 1.5rem 1rem;
  width: 100%;
  border-bottom: 1.2px solid rgba(53, 53, 53, 0.15);
  @media (max-width: 1920px) {
    width: 100%;
  }
  @media (max-width: 1280px) {
    width: 110%;
  }
  // @media(max-width: 1100px) {
  //   width: 160%;
  // }
  // @media(max-width: 800px) {
  //   width: 175%;
  // }
  // @media(max-width: 710px) {
  //   width: 250%;
  // }
  // @media(max-width:515px) {
  //   width: 350%;
  // }

  div {
    text-align: center;
    width: 100%;
  }
  .name {
  }
  .active {
  }
  .earned-rewards {
    cursor: pointer;
    transition: scale 200ms ease;
    border-radius: 0.5rem;
    margin-right: 2rem;
    &:hover {
      width: 35%;
      margin: 0 auto;
      transform: scale(1.1);
    }
  }
  .staked {
  }
  .pool {
  }
  .unstaked {
    @media (max-width: 1280px) {
      margin-left: 1.5rem;
    }
  }
  .value {
    margin-left: 1rem;
    @media (max-width: 1280px) {
      margin-left: 1.5rem;
    }
  }
  .rewards-to-date {
  }
`;
const MainTableHeader = styled.div`
  display: grid;
  grid-template-columns: 0.75fr 0.5fr 0.75fr 0.75fr 0.75fr 0.75fr 0.5fr;
  grid-gap: 20px;
  font-size: 2rem;
  font-family: ${fonts.headerFont};
  padding: 1.5rem 1rem;
  border-bottom: 2px black solid;
  width: 100%;
  @media (max-width: 1280px) {
    width: 110%;
  }
  // @media(max-width: 1920px) {
  //   width: 100%;
  // }
  // @media(max-width: 1800px) {
  //   width: 120%;
  // }
  // @media(max-width: 1100px) {
  //   width: 160%;
  // }
  // @media(max-width: 800px) {
  //   width: 175%;
  // }
  // @media(max-width: 710px) {
  //   width: 250%;
  // }
  // @media(max-width:515px) {
  //   width: 350%;
  // }

  p {
    text-align: center;
    width: 100%;

    &:nth-child(8) {
    }
  }
`;

const PanelTabContainerLeft = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const PanelTab = styled.div`
  margin-right: 0.75rem;
  border-radius: 1.2rem;
  border-top: ${(props) => props.theme.style.mainBorder};
  border-left: ${(props) => props.theme.style.mainBorder};
  border-right: ${(props) => props.theme.style.mainBorder};
  padding: 0.75rem 2rem 2rem 2rem;
  background-color: ${(props) => props.theme.style.highlight};
  box-shadow: ${(props) => props.theme.style.panelTabBoxShadow};
  position: relative;
  top: 1.2rem;
  color: ${(props) => props.theme.style.buttonFontColor};

  p {
    color: ${(props) => props.theme.style.panelTabLinkColor};
    text-decoration: none;
    font-family: ${fonts.contentFont};
    font-size: 2rem;
    position: relative;
    top: 0.1rem;
    @media (max-width: 500px) {
      font-size: 1.5rem;
      top: 0.3rem;
    }
  }
  @media (max-width: 605px) {
    font-size: 1.9rem;
    padding: 0.75rem 1rem 2.2rem 1rem;
    position: relative;
    top: 0.1rem;
  }
  @media (max-width: 550px) {
    margin-right: 0.5rem;
  }
  @media (max-width: 380px) {
    font-size: 1.5rem;
    padding: 0.75rem 0.75rem 2rem 0.75rem;
    position: relative;
    margin-right: 0.5rem;
    top: 0.5rem;
    p {
      top: 0.4rem;
    }
  }
  @media (max-width: 333px) {
    margin-right: 0.3rem;
  }
`;

const columns = [
  {
    name: "Profit Sharing Pool",
  },
  {
    name: "Earns",
  },
  {
    name: "Claimable",
  },
  {
    name: "Staked",
  },
  {
    name: "% of Pool",
  },
  {
    name: "Unstaked",
  },
  {
    name: "Value",
  },
];

const noAssetColumns = [
  {
    name: "You currently are not staking any assets",
  },
];
const noAssetData = [
  {
    asset: "Stake assets to get started",
  },
];

const FarmingTable = () => {
  const { state, setState, setUnstakedFarm } = useContext(HarvestContext);
  const getThisReward = (reward) => {
    console.log(reward);
    setState({ ...state, minimumHarvestAmount: reward });
  };

  const getTotalFarmEarned = () => {
    let total = 0;
    if (state.summaries.length !== 0) {
      state.summaries.map(utils.prettyPosition).map((summary, index) => {
        if (summary.name === "FARM Profit Sharing") {
          setUnstakedFarm(summary.unstakedBalance.toString());
        }
        setState({
          ...state,
          totalFarmEarned: (state.totalFarmEarned += parseFloat(
            summary.historicalRewards,
          )),
        });
      });
    }
  };

  useEffect(() => {
    if (state.totalFarmEarned === 0) {
      getTotalFarmEarned();
    }
  }, [state.summaries]);

  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      {state.display ? (
        <PanelTabContainerLeft>
          <PanelTab>
            <p>your staked assets</p>
          </PanelTab>
        </PanelTabContainerLeft>
      ) : null}
      {state.display ? (
        <TableContainer>
          {state.summaries.length === 0 ? (
            <DataTable
              noHeader={true}
              noDivider={true}
              columns={noAssetColumns}
              noDataComponent={false}
              data={noAssetData}
            />
          ) : (
            <MainTableInner>
              <MainTableHeader>
                {columns.map((col, i) => {
                  return (
                    <p className={col.name} key={i}>
                      {col.name}
                    </p>
                  );
                })}
              </MainTableHeader>
              {state.summaries
                .map(utils.prettyPosition)
                .map((summary, index) => (
                  <MainTableRow key={summary.address}>
                    <div className="name">{summary.name}</div>
                    <div className="active">{String(summary.isActive)}</div>
                    <div
                      className="earned-rewards"
                      onClick={() => getThisReward(summary.earnedRewards)}
                    >
                      {Math.floor(parseFloat(summary.earnedRewards)).toFixed(6)}
                    </div>
                    <div className="staked">
                      {parseFloat(summary.stakedBalance).toFixed(6)}
                    </div>
                    <div className="pool">{summary.percentOfPool}</div>
                    <div className="unstaked">
                      {parseFloat(summary.unstakedBalance).toFixed(6)}
                    </div>
                    <div className="value">{summary.usdValueOf}</div>
                  </MainTableRow>
                ))}
            </MainTableInner>
          )}
        </TableContainer>
      ) : (
        <FarmTableSkeleton state={state} />
      )}
    </ThemeProvider>
  );
};

export default FarmingTable;
