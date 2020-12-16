import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import styled, { ThemeProvider } from "styled-components";
import harvest from "../../lib/index";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";

import FarmTableSkeleton from "./FarmTableSkeleton";

const { utils } = harvest;

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
  grid-template-columns: 1fr 0.5fr 1fr 1fr 1fr 1fr 1fr 1fr;
  font-size: 1.7rem;
  font-family: ${fonts.contentFont};
  padding: 1.5rem 1rem;
  width: 100%;
  border-bottom: 1.2px solid rgba(53, 53, 53, 0.15);
  @media (max-width: 1100px) {
    width: 120%;
  }
  @media (max-width: 800px) {
    width: 150%;
  }
  @media (max-width: 700px) {
    width: 200%;
  }
  @media (max-width: 510px) {
    width: 350%;
  }

  div {
    min-width: 5rem;
  }
  .active {
    margin-left: 2rem;
  }
  .rewards {
    cursor: pointer;
  }
  .pool {
    margin-left: 2rem;
  }
  .unstaked {
    margin-left: 1rem;
  }
  .value {
    margin-left: 2rem;
  }
`;
const MainTableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  font-size: 2rem;
  font-family: ${fonts.headerFont};
  padding: 1.5rem 1rem;
  border-bottom: 2px black solid;
  width: 100%;
  @media (max-width: 1100px) {
    width: 120%;
  }
  @media (max-width: 800px) {
    width: 150%;
  }
  @media (max-width: 700px) {
    width: 200%;
  }
  @media (max-width: 510px) {
    width: 350%;
  }

  p {
    min-width: 5rem;
  }
`;
// const StyledTableHeader = styled(TableHeader)`
//   display: grid;
//   padding: 24px 15px;
//   border-bottom: 1px solid #e5e7eb;
//   font-size: 13px;
//   text-align: left;
// `;

const columns = [
  {
    name: "Pool",
    selector: "name",
  },
  {
    name: "Earns?",
    selector: (data) => data.isActive.toString(),
    compact: true,
  },
  {
    name: "Claimable",
    selector: "earnedRewards",
    compact: true,
  },
  {
    name: "To-Date",
    selector: "",
    compact: true,
  },
  {
    name: "Staked",
    selector: "stakedBalance",
    compact: true,
  },
  {
    name: "Pool%",
    selector: "percentOfPool",
    compact: true,
  },
  {
    name: "Unstaked",
    selector: "unstakedBalance",
    compact: true,
  },
  {
    name: "Value",
    selector: "usdValueOf",
    sortable: true,
    compact: true,
  },
];

const noAssetColumns = [
  {
    name: "You currently are not staking any assets",
    // selector: (data) => data.asset.name,
    selector: "asset",
    center: true,
  },
];
const noAssetData = [
  {
    id: 0,
    asset: "Stake assets to get started",
    center: true,
  },
];

const FarmingTable = ({ state, setState }) => {
  const getThisReward = (reward) => {
    setState({ ...state, minimumHarvestAmount: reward });
  };

  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
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
                  return <p key={i}>{col.name}</p>;
                })}
              </MainTableHeader>
              {state.summaries
                .map(utils.prettyPosition)
                .map((summary, index) => (
                  <MainTableRow key={summary.address}>
                    <div>{summary.name}</div>
                    <div className="active">{String(summary.isActive)}</div>
                    <div
                      className="rewards"
                      onClick={() => getThisReward(summary.earnedRewards)}
                    >
                      {parseFloat(summary.earnedRewards).toFixed(8)}
                    </div>
                    <div className="rewardsToDate">
                      {parseFloat(summary.historicalRewards).toFixed(8)}
                    </div>
                    <div>{parseFloat(summary.stakedBalance).toFixed(10)}</div>
                    <div className="pool">{summary.percentOfPool}</div>
                    <div className="unstaked">
                      {parseFloat(summary.unstakedBalance).toFixed(10)}
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
