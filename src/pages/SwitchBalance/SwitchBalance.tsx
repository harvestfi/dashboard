import React from 'react'
import { CheckBalance } from './components/CheckBalance'
import { UserDashboard } from './components/UserDashboard'

type CheckBalanceProps = {}

export const SwitchBalance: React.FC<CheckBalanceProps> = (props) => {
  return (
    <>
      <UserDashboard
        onGoDashboard={() => {
          console.log('- - - - ->')
        }}
      />
      <CheckBalance />
    </>
  )
}
