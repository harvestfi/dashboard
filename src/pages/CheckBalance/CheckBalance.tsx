import React, { useEffect } from 'react'
import { FarmingTable } from '@/components/farmingTable/FarmingTable'
import { observer } from 'mobx-react'
import { useStores } from '@/stores/utils'
import * as Styled from './styles'
import { Wallet } from '@/components/Wallet'

type CheckBalanceProps = {}

export const CheckBalance: React.FC<CheckBalanceProps> = observer((props) => {
  const { assetToCheckStore } = useStores()

  useEffect(() => {
    if (!assetToCheckStore.isFetched) {
      assetToCheckStore.fetch()
    }
  }, [])

  return (
    <Styled.Main>
      <Wallet address={assetToCheckStore.address} />
      <FarmingTable
        display={assetToCheckStore.isFetched}
        assets={assetToCheckStore.value}
      />
    </Styled.Main>
  )
})
