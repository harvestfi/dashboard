import React, { useEffect } from 'react'
import { FarmingTable } from '@/components/farmingTable/FarmingTable'
import { FarmInfo } from '@/components/farmInfo/FarmInfo'
import { observer } from 'mobx-react'
import { useStores } from '@/stores/utils'
import * as Styled from './styles'
import { Wallet } from '@/components/Wallet'
import { Panel } from '@/App/styles/AppJsStyles'

type CheckBalanceProps = {}

export const CheckBalance: React.FC<CheckBalanceProps> = observer((props) => {
  const { assetsStore, appStore, savedGasStore } = useStores()

  useEffect(() => {
    assetsStore.fetch()
    savedGasStore.fetch(appStore.address)
  }, [])

  return (
    <Styled.Main style={{ padding: '30px 0' }}>
      <Panel>
        <Wallet address={appStore.address} />
        <FarmInfo
          isLoadingAssets={assetsStore.isFetching}
          stakedBalance={assetsStore.stakedBalance}
        />
        <FarmingTable
          display={assetsStore.isFetched}
          assets={assetsStore.value}
        />
      </Panel>
    </Styled.Main>
  )
})
