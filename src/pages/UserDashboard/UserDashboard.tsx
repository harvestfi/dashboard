import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as Styled from './styles'
import { Wallet } from '@/components/Wallet'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'
import { FarmingTable } from '@/components/farmingTable/FarmingTable'
import { FarmInfo } from '@/components/farmInfo/FarmInfo'
import { AddTokens } from '@/components/addTokens/AddTokens'
import { PATHS } from '@/routes'

type UserDashboardProps = {}

export const UserDashboard: React.FC<UserDashboardProps> = observer(() => {
  const { assetsStore, appStore, savedGasStore, metaMaskStore } = useStores()
  const history = useHistory()

  useEffect(() => {
    if (!appStore.address && !metaMaskStore.isConnecting) {
      history.push(PATHS.main)
    }
  })

  useEffect(() => {
    if (appStore.address) {
      assetsStore.fetch()
      savedGasStore.fetch(appStore.address)
    }
  }, [appStore.address]) // this effect runs whenever appStore.address is changed

  return (
    <Styled.Main>
      <>
        <Wallet address={appStore.address} />
        <FarmInfo
          isLoadingAssets={!assetsStore.isFetched}
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
