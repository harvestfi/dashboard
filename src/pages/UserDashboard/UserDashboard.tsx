import React, { useEffect } from 'react'
import * as Styled from './styles'
import { Wallet } from '@/components/Wallet'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'
import { FarmingTable } from '@/components/farmingTable/FarmingTable'
import { FarmInfo } from '@/components/farmInfo/FarmInfo'
import { AddTokens } from '@/components/addTokens/AddTokens'

type UserDashboardProps = {}

export const UserDashboard: React.FC<UserDashboardProps> = observer(() => {
  const { assetsStore, appStore, savedGasStore, metaMaskStore } = useStores()

  useEffect(() => {
    if (appStore.address) {
      if (!assetsStore.isFetched) {
        assetsStore.fetch()
      }

      savedGasStore.fetch(appStore.address)
    }
  }, [appStore.address])

  return (
    <Styled.Main>
      <>
        <Wallet address={appStore.address} />
        <FarmInfo
          isLoadingAssets={assetsStore.isFetching}
          stakedBalance={assetsStore.stakedBalance}
        />
        <FarmingTable
          display={assetsStore.isFetched}
          assets={assetsStore.value}
        />
        <AddTokens />
      </>
    </Styled.Main>
  )
})
