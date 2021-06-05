import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FarmingTable } from '@/components/farmingTable/FarmingTable'
import { FarmInfo } from '@/components/farmInfo/FarmInfo'
import { observer } from 'mobx-react'
import { useStores } from '@/stores/utils'
import * as Styled from './styles'
import { Wallet } from '@/components/Wallet'
import { validateAddress } from '@/utils/utils'

type CheckBalanceProps = {}

export const CheckBalance: React.FC<CheckBalanceProps> = observer((props) => {
  const { assetsStore, appStore, savedGasStore } = useStores()
  const { address } = useParams()

  useEffect(() => {
    // If we land on this page directly, we should see if it's valid and if it is,
    // load the data for that address.
    if (!appStore.address && address && validateAddress(address)) {
      appStore.setAddress(address)
    }

    if (appStore.address) {
      assetsStore.fetch()
      savedGasStore.fetch(appStore.address)
    }
  }, [])

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
      </>
    </Styled.Main>
  )
})
