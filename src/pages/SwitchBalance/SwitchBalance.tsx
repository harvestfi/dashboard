import React, { useEffect } from 'react'
import { CheckBalance } from './components/CheckBalance'
import { UserDashboard } from './components/UserDashboard'
import { observer } from 'mobx-react'
import { useStores } from '@/stores/utils'

type CheckBalanceProps = {}

export const SwitchBalance: React.FC<CheckBalanceProps> = observer((props) => {
  return (
    <>
      <UserDashboard />
      <CheckBalance />
    </>
  )
})
