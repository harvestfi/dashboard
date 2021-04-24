import React from 'react'
import styled from 'styled-components'

import { fonts } from '../../styles/appStyles'
import { IAssetsInfo } from '../../types'
import {
  TableContainer,
  MainTableInner,
  MainTableRow,
  MainTableHeader,
  PanelTabContainerLeft,
  PanelTab,
  Tabs,
} from './FarmingTableStyles'
import FarmTableSkeleton from './FarmTableSkeleton'

interface IProps {
  display: boolean
  assets: IAssetsInfo[]
  currentExchangeRate: number
}

// const { utils } = harvest;

const columns = [
  {
    name: 'Rewards Pool',
  },
  {
    name: 'Earn FARM',
  },
  {
    name: 'FARM to Claim',
  },
  {
    name: 'Staked Asset',
  },
  {
    name: '% of Pool',
  },
  {
    name: 'Underlying balance',
  },
  {
    name: 'Value',
  },
  {
    name: 'Unstaked',
  },
]

const FarmingTable: React.FC<IProps> = ({
  display,
  assets,
  currentExchangeRate,
}) => {
  // TODO: implement sorting on the table and remove the commented out code

  // const [sortedSummary, setSortedSummary] = useState([]);
  // const [sortDirection, setSortDirection] = useState(1);
  // const sortSummary = (_col, index) => {
  //   // earnedRewards, stakedBalance, percentOfPool, usdValueOf, unstakedBalance
  //   const filteredArray = sortedSummary;
  //   if (index >= 2 && index <= 6) {
  //     filteredArray.sort((a, b) => {
  //       const first =
  //         index === 2
  //           ? a.earnedRewards
  //           : index === 3
  //             ? a.stakedBalance
  //             : index === 4
  //               ? a.percentOfPool.substr(0, a.percentOfPool.length - 1)
  //               : index === 5
  //                 ? a.usdValueOf
  //                 : index === 6
  //                   ? a.unstakedBalance
  //                   : 0;
  //       const second =
  //         index === 2
  //           ? b.earnedRewards
  //           : index === 3
  //             ? b.stakedBalance
  //             : index === 4
  //               ? b.percentOfPool.substr(0, b.percentOfPool.length - 1)
  //               : index === 5
  //                 ? b.usdValueOf
  //                 : index === 6
  //                   ? b.unstakedBalance
  //                   : 0;
  //       return parseFloat(first) >= parseFloat(second) ? sortDirection : -sortDirection;
  //     });
  //   } else if (index === 1) {
  //     filteredArray.sort((a, b) => {
  //       return (a.isActive || 0) >= (b.isActive || 0) ? sortDirection : -sortDirection;
  //     });
  //   }
  //   setSortedSummary([...filteredArray]);
  //   setSortDirection(-sortDirection);
  // };

  // const getTotalFarmEarned = useCallback(() => {
  //   let total = 0;
  //   if (state.summaries.length !== 0) {
  //     // eslint-disable-next-line
  //     state.summaries.map(utils.prettyPosition).map((summary, _index) => {
  //       total += parseFloat(summary.historicalRewards);
  //       setState(prevState => ({
  //         ...prevState,
  //         totalFarmEarned: total,
  //       }));
  //     });
  //   }
  // }, [setState, state.summaries]);

  return (
    <>
      {display && (
        <Tabs>
          <PanelTabContainerLeft>
            <PanelTab>
              <p>your staked assets</p>
            </PanelTab>
          </PanelTabContainerLeft>
        </Tabs>
      )}
      {display ? (
        <TableContainer>
          {assets.length === 0 ? (
            <NoAssetTable>
              <div className="header">
                <p>You currently are not staking any assets</p>
              </div>
              <div className="content">
                <div className="name">
                  {' '}
                  <p>Stake assets to start earning!</p>{' '}
                </div>
              </div>
            </NoAssetTable>
          ) : (
            <MainTableInner>
              <MainTableHeader>
                {columns.map((col) => {
                  return (
                    <div
                      className={`${col.name} table-header`}
                      key={col.name}
                      // onKeyUp={() => sortSummary(col, i)}
                      // onClick={() => sortSummary(col, i)}
                      role="button"
                      tabIndex={0}
                    >
                      {col.name}
                    </div>
                  )
                })}
              </MainTableHeader>
              {assets.map((asset) => {
                return (
                  <MainTableRow key={asset.address}>
                    <div className="name">{asset.name}</div>
                    <div className="active">{asset.earnFarm.toString()}</div>
                    <div
                      className="earned-rewards"
                      // TODO: implements it
                      // onKeyUp={() => getThisReward(summary.earnedRewards)}
                      // onClick={() => getThisReward(summary.earnedRewards)}
                      role="button"
                      tabIndex={0}
                    >
                      {asset.farmToClaim.toFixed(6)}
                    </div>
                    <div className="staked">
                      {asset.stakedBalance.toFixed(6)}
                    </div>
                    <div className="pool">{`${asset.percentOfPool.toFixed(
                      6,
                    )}%`}</div>
                    <div className="underlying">
                      {asset.underlyingBalance.toFixed(6)}
                    </div>
                    <div className="value">
                      {(asset.value * currentExchangeRate).toFixed(2)}
                    </div>
                    <div className="unstaked">
                      {asset.unstakedBalance.toFixed(6)}
                    </div>
                  </MainTableRow>
                )
              })}
            </MainTableInner>
          )}
        </TableContainer>
      ) : (
        <FarmTableSkeleton />
      )}
    </>
  )
}

export default FarmingTable

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
`
