import React from 'react'
import * as Styled from './styles'
import { Wallet } from './components'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'
import { FarmingTable } from '@/components/farmingTable/FarmingTable'
import AddTokens from '@/components/addTokens/AddTokens'

type UserDashboardProps = {
  isLoading: boolean
}

export const UserDashboard: React.FC<UserDashboardProps> = observer((props) => {
  const { metaMaskStore } = useStores()

  return (
    <Styled.Main>
      <Wallet />
      <FarmingTable
        currentExchangeRate={currentExchangeRate}
        display={showUserAssets}
        assets={assets}
        baseCurrency={baseCurrency}
      />
      <AddTokens />
    </Styled.Main>
  )
})
