import React, { useEffect } from 'react'
import * as Styled from './styles'
import { Wallet } from '@/components/Wallet'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'
import { FarmingTable } from '@/components/farmingTable/FarmingTable'
import { FarmInfo } from '@/components/farmInfo/FarmInfo'
import AddTokens from '@/components/addTokens/AddTokens'

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
      <Wallet address={userAssetsStore.address} />
      <FarmInfo />
      <FarmingTable
        display={userAssetsStore.isFetched}
        assets={userAssetsStore.value}
      />
      <AddTokens />
    </Styled.Main>
  )
})
