import React, { useEffect, useContext, useState } from "react";
import HarvestContext from "../../Context/HarvestContext";
import styled, { ThemeProvider } from "styled-components";
import harvest from "../../lib/index";
import ethers from 'ethers';
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import { TableContainer, MainTableInner, MainTableRow, MainTableHeader, PanelTabContainerLeft, PanelTabContainerRight, PanelTab, Tabs } from './FarmingTableStyles';

import FarmTableSkeleton from "./FarmTableSkeleton";

const { utils } = harvest;

const columns = [
  {
    name: "Rewards Pool",
  },
  {
    name: "Earn FARM",
  },
  {
    name: "FARM to Claim",
  },
  {
    name: "Staked Asset",
  },
  {
    name: "% of Pool",
  },
  {
    name: "Value",
  },
  {
    name: "Unstaked",
  },
];

const FarmingTable = ({ showAsCards }) => {
  const {
    state,
    setState,
    refresh,
    isRefreshing,
    isCheckingBalance,
    prettyBalance,
    currentExchangeRate
  } = useContext(HarvestContext);
  const getThisReward = (reward) => {
    setState({ ...state, minimumHarvestAmount: reward });
  };
  const [sortedSummary, setSortedSummary] = useState([]);
  const [sortDirection, setSortDirection] = useState(1);
  const _sortSummary = (col, index) => {
    //earnedRewards, stakedBalance, percentOfPool, usdValueOf, unstakedBalance
    const filteredArray = sortedSummary;
    if (index >= 2 && index <= 6) {
      filteredArray.sort((a, b) => {
        const first = index === 2 ? a.earnedRewards : index === 3 ? a.stakedBalance : index === 4 ? a.percentOfPool.substr(0, a.percentOfPool.length - 1) : index === 5 ? a.usdValueOf : index === 6 ? a.unstakedBalance : 0;
        const second = index === 2 ? b.earnedRewards : index === 3 ? b.stakedBalance : index === 4 ? b.percentOfPool.substr(0, b.percentOfPool.length - 1) : index === 5 ? b.usdValueOf : index === 6 ? b.unstakedBalance : 0;
        return parseFloat(first) >= parseFloat(second) ? sortDirection : -sortDirection;
      });
    }
    else if (index === 1) {
      filteredArray.sort((a, b) => {
        return (a.isActive | 0) >= (b.isActive | 0) ? sortDirection : -sortDirection;
      });
    }
    setSortedSummary([...filteredArray]);
    setSortDirection(-sortDirection);
  }

  const getTotalFarmEarned = () => {
    let total = 0;
    if (state.summaries.length !== 0) {
      // eslint-disable-next-line 
      state.summaries.map(utils.prettyPosition).map((summary, index) => {
        total += parseFloat(summary.historicalRewards);
        setState({
          ...state,
          totalFarmEarned: (state.totalFarmEarned = total),
        });

      });
    }
  };

  useEffect(() => {
    if (state.totalFarmEarned === 0) {
      getTotalFarmEarned();
    }
    const array = state.summaries.map(utils.prettyPosition);
    setSortedSummary(array);
  }, [state.summaries]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getTotalFarmEarned();

    }, 60000);
    return () => clearTimeout(timer);
  });
  const handleRefresh = () => {

  }
  useEffect(() => {
    console.log(isRefreshing)
  }, [isRefreshing]);
  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      {state.display ? (
        <Tabs>
          <PanelTabContainerLeft>
            <PanelTab>
              <p>your staked assets</p>
            </PanelTab>
          </PanelTabContainerLeft>

          <PanelTabContainerRight>
            <PanelTab className={isRefreshing ? "refresh-disabled" : "refresh-button"} onClick={showAsCards}>
              <i className="fas fa-table"></i>
            </PanelTab>
            {isCheckingBalance ? "" : <PanelTab className={isRefreshing ? "refresh-disabled" : "refresh-button"} onClick={refresh}>
              <i className="fas fa-sync-alt"></i>
            </PanelTab>}

          </PanelTabContainerRight>

        </Tabs>
      ) : null}
      {state.display ? (
        <TableContainer>
          {sortedSummary.length === 0 ? (
            <NoAssetTable>
              <div className="header">
                <p>You currently are not staking any assets</p>
              </div>
              <div className="content">
                <div className="name">
                  {" "}
                  <p>Stake assets to start earning!</p>{" "}
                </div>
              </div>
            </NoAssetTable>
          ) : (
              <MainTableInner>
                <MainTableHeader>
                  {columns.map((col, i) => {
                    return (
                      <p className={`${col.name} table-header`} key={i} onClick={() => _sortSummary(col, i)}>
                        {col.name}
                      </p>
                    );
                  })}
                </MainTableHeader>
                {sortedSummary
                  .map((summary, index) => (
                    <MainTableRow key={summary.address}>
                      <div className="name">{summary.name}</div>
                      <div className="active">{String(summary.isActive)}</div>
                      <div
                        className="earned-rewards"
                        onClick={() => getThisReward(summary.earnedRewards)}
                      >
                        {parseFloat(summary.earnedRewards).toFixed(6)}
                      </div>
                      <div className="staked">
                        {parseFloat(summary.stakedBalance).toFixed(6)}
                      </div>
                      <div className="pool">{summary.percentOfPool}</div>
                      <div className="value">{prettyBalance(summary.usdValueOf * currentExchangeRate)}</div>
                      <div className="unstaked">
                        {Math.floor(parseFloat(summary.unstakedBalance)).toFixed(6)}
                      </div>
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

const NoAssetTable = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .header {
    font-size: 2rem;
    font-family: ${fonts.headerFont};
    padding: 1.5rem 1rem;
    border-bottom: 2px black solid;
    width: 100%;
    p {
      text-align: center;
    }
  }
  .content {
    width: 100%;
    font-size: 1.7rem;
    font-family: ${fonts.contentFont};
    padding: 1.5rem 1rem;
    width: 100%;
    border-bottom: 1.2px solid rgba(53, 53, 53, 0.15);
    p {
      text-align: center;
    }
  }
`;
