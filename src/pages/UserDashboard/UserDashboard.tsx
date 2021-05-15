import React, { useEffect } from 'react'
import * as Styled from './styles'
import { Wallet } from './components'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'
import { FarmingTable } from '@/components/farmingTable/FarmingTable'
import { FarmInfo } from '@/components/farmInfo/FarmInfo'
import AddTokens from '@/components/addTokens/AddTokens'

type UserDashboardProps = {}

export const UserDashboard: React.FC<UserDashboardProps> = observer(() => {
  const { userAssetsStore, savedGasStore, metaMaskStore } = useStores()

  useEffect(() => {
    if (!userAssetsStore.value && !userAssetsStore.isFetching) {
      userAssetsStore.fetch()
    }

    if (!savedGasStore.value && !savedGasStore.isFetching) {
      savedGasStore.fetch(userAssetsStore.address)
    }
  }, [])

  return (
    <Styled.Main>
      <Wallet />
      <FarmInfo assets={userAssetsStore.value} savedGas={savedGasStore.value} />
      <FarmingTable
        display={!!userAssetsStore.value}
        assets={userAssetsStore.value}
      />
      <AddTokens />
    </Styled.Main>
  )
})
