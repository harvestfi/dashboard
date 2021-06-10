import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FarmingTable } from '@/components/farmingTable/FarmingTable'
import { FarmInfo } from '@/components/farmInfo/FarmInfo'
import { observer } from 'mobx-react'
import { useStores } from '@/stores/utils'
import * as Styled from './styles'
import { Wallet } from '@/components/Wallet'
import { validateAddress } from '@/utils/utils'
import { PATHS } from '@/routes'

type CheckBalanceProps = {}

export const CheckBalance: React.FC<CheckBalanceProps> = observer((props) => {
  const { assetsStore, appStore, savedGasStore } = useStores()
  const { address } = useParams()
  const history = useHistory()

  useEffect(() => {
    // If we land on this page directly, we set the address in the appStore
    if (!appStore.address && validateAddress(address)) {
      appStore.setAddress(address)
    }

    // If the address is not valid, redirect the user back to the main page
    if (!address || !validateAddress(address)) {
      return history.push(PATHS.main)
    }

    assetsStore.fetch()
    savedGasStore.fetch(appStore.address)
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
