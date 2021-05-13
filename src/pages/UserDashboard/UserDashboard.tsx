import React from 'react'
import * as Styled from './styles'
import { Wallet } from './components'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'

type UserDashboardProps = {
  isLoading: boolean
}

export const UserDashboard: React.FC<UserDashboardProps> = observer((props) => {
  const { metaMaskStore } = useStores()

  return (
    <Styled.Main>
      <Wallet />
    </Styled.Main>
  )
})
