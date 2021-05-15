import React, { useEffect } from 'react'
import { FarmingTable } from '@/components/farmingTable/FarmingTable'
import { observer } from 'mobx-react'
import { useStores } from '@/stores/utils'
import * as Styled from './styles'

type CheckBalanceProps = {}

export const CheckBalance: React.FC<CheckBalanceProps> = observer((props) => {
  const { assetToCheckStore } = useStores()

  useEffect(() => {
    if (!assetToCheckStore.value && !assetToCheckStore.isFetching) {
      assetToCheckStore.fetch()
    }
  }, [])

  return (
    <Styled.Main>
      <FarmingTable
        display={!!assetToCheckStore.value}
        assets={assetToCheckStore.value}
      />
    </Styled.Main>
  )
})
