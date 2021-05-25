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
  const { assetToCheckStore } = useStores()

  useEffect(() => {
    if (!assetToCheckStore.isFetched) {
      assetToCheckStore.fetch()
    }
  }, [])

  return (
    <Panel>
      <Styled.Main style={{ padding: '30px 0' }}>
        <Panel>
          <Wallet address={assetToCheckStore.address} />
          <FarmInfo
            isLoadingAssets={assetToCheckStore.isFetching}
            stakedBalance={assetToCheckStore.stakedBalance}
          />
          <FarmingTable
            display={assetToCheckStore.isFetched}
            assets={assetToCheckStore.value}
          />
        </Panel>
      </Styled.Main>
    </Panel>
  )
})
