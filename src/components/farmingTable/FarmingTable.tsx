import React from 'react'
import styled from 'styled-components'

import { fonts } from '../../App/styles/appStyles'
import { IAssetsInfo } from '../../types'
import { prettyNumber, prettyCurrency } from '../../utils/utils'
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
import { observer } from 'mobx-react'
import { useStores } from '@/stores/utils'

interface IProps {
  display: boolean
  assets: IAssetsInfo[]
}

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

export const FarmingTable: React.FC<IProps> = observer((props) => {
  const { display, assets } = props
  const { settingsStore, exchangeRatesStore } = useStores()

  const baseCurrency = settingsStore.settings.currency.value
  // TODO fix
  // const currentExchangeRate = exchangeRatesStore.value?.[baseCurrency]

  const assetRows = assets?.map((asset) => {
    const prettyFarmToClaim: string = asset.farmToClaim
      ? prettyNumber(asset.farmToClaim.toNumber())
      : '-'
    const prettyStakedBalance: string = asset.stakedBalance
      ? prettyNumber(asset.stakedBalance.toNumber())
      : '-'

    const prettyUnderlyingBalance: string = asset.underlyingBalance
      ? prettyNumber(asset.underlyingBalance.toNumber())
      : '-'

    const prettyValue: string = asset.value
      ? prettyCurrency(
          // Number(asset.value.toNumber() * currentExchangeRate),
          Number(asset.value.toNumber() * 1),
          baseCurrency,
        )
      : '-'

    const prettyUnstakedBalance: string = asset.unstakedBalance
      ? prettyNumber(asset.unstakedBalance.toNumber())
      : '-'

    const persentOfPool: string = asset.percentOfPool
      ? `${asset.percentOfPool.toFixed(6)}%`
      : '-'

    return (
      <MainTableRow key={asset.address.pool || asset.address.vault}>
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
          {prettyFarmToClaim}
        </div>
        <div className="staked">{prettyStakedBalance}</div>
        <div className="pool">{persentOfPool}</div>
        <div className="underlying">{prettyUnderlyingBalance}</div>
        <div className="value">{prettyValue}</div>
        <div className="unstaked">{prettyUnstakedBalance}</div>
      </MainTableRow>
    )
  })

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
          {assets?.length === 0 ? (
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
                      // TODO: implement sorting
                      role="button"
                      tabIndex={0}
                    >
                      {col.name}
                    </div>
                  )
                })}
              </MainTableHeader>
              {assetRows}
            </MainTableInner>
          )}
        </TableContainer>
      ) : (
        <FarmTableSkeleton />
      )}
    </>
  )
})

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
