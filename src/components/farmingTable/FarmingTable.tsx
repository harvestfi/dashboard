import React, { useState } from 'react'
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
import flash from '@/assets/flash.svg'
interface IProps {
  display: boolean
  assets: IAssetsInfo[]
}

const columns = [
  {
    name: 'Rewards Pool',
  },
  {
    name: 'FARM to Claim',
  },
  {
    name: '% of Pool',
  },
  {
    name: 'Value',
  },
]

function importAll(r: any) {
  let images: any = {}
  r.keys().map((item: string) => {
    images[item.replace('./', '')] = r(item)
  })
  return images
}
const icons = importAll(
  require.context(
    '../../assets/harvest-icons/vaults/',
    false,
    /\.(png|jpe?g|svg)$/,
  ),
)

export const FarmingTable: React.FC<IProps> = observer((props) => {
  const { display, assets } = props
  const { settingsStore, exchangeRatesStore } = useStores()
  const [accordion, setAccordion] = useState<string[]>([])

  const toggleAccordion = (id: string) => {
    if (accordion.includes(id)) {
      setAccordion(accordion.filter((item) => item !== id))
    } else {
      setAccordion([...accordion, id])
    }
  }

  const displayCurrency = settingsStore.settings.currency.value
  const currentExchangeRate =
    exchangeRatesStore.exchangeRates.values[displayCurrency]

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
      ? prettyCurrency(asset.value, displayCurrency, currentExchangeRate)
      : '-'

    const prettyUnstakedBalance: string = asset.unstakedBalance
      ? prettyNumber(asset.unstakedBalance.toNumber())
      : '-'

    const persentOfPool: string = asset.percentOfPool
      ? `${asset.percentOfPool.toFixed(6)}%`
      : '-'

    const VaultIcon = (props: any) => {
      const { vaultName } = props
      return (
        <img
          className="vault-icon"
          src={`${
            icons[vaultName.replace(/^V_/, '').replace(/_#V1$/, '') + '.png']
          }`}
        ></img>
      )
    }

    return (
      <>
        <MainTableRow
          key={asset.address.pool || asset.address.vault}
          className={accordion.includes(asset.name) ? 'open' : ''}
          onClick={() => {
            toggleAccordion(asset.name)
          }}
        >
          <div
            className="name"
            title={asset.earnFarm ? 'Earn FARM: true' : undefined}
          >
            <VaultIcon vaultName={asset.name} />
            {asset.name}{' '}
            {asset.earnFarm && <img className="flash" src={flash} alt="" />}
          </div>
          {/* <div className="active">{asset.earnFarm.toString()}</div> */}
          <div className="earned-rewards" role="button" tabIndex={0}>
            {prettyFarmToClaim}
          </div>
          <div className="pool">{persentOfPool}</div>
          <div className="value">{prettyValue}</div>
          <div
            className={`details ${
              accordion.includes(asset.name) ? 'open' : ''
            }`}
          >
            {' '}
            <i></i>
          </div>
        </MainTableRow>
        <div
          className={`accordion-row ${
            accordion.includes(asset.name) ? 'open' : ''
          }`}
        >
          <div className="inner-row">
            <div className="staked">Staked Asset: {prettyStakedBalance}</div>
            <div className="underlying">
              Underlying balance: {prettyUnderlyingBalance}
            </div>
            <div className="unstaked">Unstaked: {prettyUnstakedBalance}</div>
          </div>
        </div>
      </>
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
