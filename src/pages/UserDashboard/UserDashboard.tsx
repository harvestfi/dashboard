import React, { useEffect } from 'react'
import * as Styled from './styles'
import { Wallet } from '@/components/Wallet'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'
import { FarmingTable } from '@/components/farmingTable/FarmingTable'
import { FarmInfo } from '@/components/farmInfo/FarmInfo'
import AddTokens from '@/components/addTokens/AddTokens'
import { Panel } from '@/App/styles/AppJsStyles'

type UserDashboardProps = {}

export const UserDashboard: React.FC<UserDashboardProps> = observer((props) => {
  const { userAssetsStore, savedGasStore } = useStores()

  useEffect(() => {
    if (!userAssetsStore.isFetched) {
      userAssetsStore.fetch()
    }

    if (!savedGasStore.isFetched) {
      savedGasStore.fetch(userAssetsStore.address)
    }
  }, [])

  return (
    <Styled.Main>
      <Panel>
        <Wallet address={userAssetsStore.address} />
        <FarmInfo
          isLoadingAssets={userAssetsStore.isFetching}
          stakedBalance={userAssetsStore.stakedBalance}
        />
        <FarmingTable
          display={userAssetsStore.isFetched}
          assets={userAssetsStore.value}
        />
        <AddTokens />
      </Panel>
    </Styled.Main>
  )
})
