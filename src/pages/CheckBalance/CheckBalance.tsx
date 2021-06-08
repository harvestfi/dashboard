import React, { useEffect } from 'react'

import { observer } from 'mobx-react'
import { useStores } from '@/stores/utils'

import { FarmingTable } from '@/components/farmingTable/FarmingTable'
import { FarmInfo } from '@/components/farmInfo/FarmInfo'
import { Wallet } from '@/components/Wallet'
import { Panel } from '@/App/styles/AppJsStyles'
import { AddTokens } from '@/components/addTokens/AddTokens'

import * as Styled from './styles'

type CheckBalanceProps = {}

export const CheckBalance: React.FC<CheckBalanceProps> = observer((props) => {
  const { assetsStore, appStore, savedGasStore, metaMaskStore } = useStores()

  useEffect(() => {
    console.log('effect', appStore.address)
    assetsStore.fetch(appStore.address)
    savedGasStore.fetch(appStore.address)
  }, [appStore.address])

  return (
    <Styled.Main style={{ padding: '30px 0' }}>
      <Panel>
        <Wallet />
        <FarmInfo
          isLoadingAssets={assetsStore.isFetching}
          stakedBalance={assetsStore.stakedBalance}
        />
        <FarmingTable
          display={assetsStore.isFetched}
          assets={assetsStore.value}
        />
        {metaMaskStore.walletAddress === appStore.address && <AddTokens />}
      </Panel>
    </Styled.Main>
  )
})
