import React, { useEffect } from 'react'
import { CheckBalance } from './components/CheckBalance'
import { UserDashboard } from './components/UserDashboard'
import { observer } from 'mobx-react'
import { useStores } from '@/stores/utils'

type CheckBalanceProps = {}

export const SwitchBalance: React.FC<CheckBalanceProps> = observer((props) => {
  const { apyStore, farmPriceStore } = useStores()

  useEffect(() => {
    apyStore.fetch()
    farmPriceStore.fetch()
  }, [])

  return (
    <>
      <UserDashboard />
      <CheckBalance />
    </>
  )
})
