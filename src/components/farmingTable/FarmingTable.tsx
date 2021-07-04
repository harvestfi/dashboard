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
  VaultIconImg,
  AccordionRow,
  Flash,
  AccordionToggle,
} from './FarmingTableStyles'
import FarmTableSkeleton from './FarmTableSkeleton'
import { observer } from 'mobx-react'
import { useStores } from '@/stores/utils'
import flashSvg from '@/assets/flash.svg'
interface IProps {
  display: boolean
  assets: IAssetsInfo[]
}

interface IVaultIconNames {
  [key: string]: string
}

interface IVaultIconProps {
  vaultName: string
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

function importAll(requiredContext: __WebpackModuleApi.RequireContext) {
  const images: IVaultIconNames = {}
  requiredContext.keys().forEach((item: string) => {
    images[item.replace('./', '')] = requiredContext(item)
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

    return (
      <>
        <MainTableRow
          key={asset.address.pool || asset.address.vault}
          open={accordion.includes(asset.name)}
          onClick={() => {
            toggleAccordion(asset.name)
          }}
        >
          <div title={asset.earnFarm ? 'Earn FARM: true' : undefined}>
            <VaultIcon vaultName={asset.name} />
            {asset.name} {asset.earnFarm && <Flash src={flashSvg} alt="" />}
          </div>
          {/* <div className="active">{asset.earnFarm.toString()}</div> */}
          <div tabIndex={0}>{prettyFarmToClaim}</div>
          <div>{persentOfPool}</div>
          <div>{prettyValue}</div>
          <AccordionToggle open={accordion.includes(asset.name)}>
            {' '}
            <i></i>
          </AccordionToggle>
        </MainTableRow>
        <AccordionRow open={accordion.includes(asset.name)}>
          <div>Staked Asset: {prettyStakedBalance}</div>
          <div>Underlying balance: {prettyUnderlyingBalance}</div>
          <div>Unstaked: {prettyUnstakedBalance}</div>
        </AccordionRow>
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

const VaultIcon: React.FC<IVaultIconProps> = (props) => {
  const { vaultName } = props
  return (
    <VaultIconImg
      src={`${
        icons[
          vaultName
            .replace(/^V_/, '')
            .replace(/^P_[f]?/, '')
            .replace(/_#V\d$/, '') + '.png'
        ]
      }`}
    ></VaultIconImg>
  )
}

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
