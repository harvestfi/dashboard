import React from 'react'

import { Route, Redirect, Switch } from 'react-router-dom'

import { ConnectWallet } from '@/pages/ConnectWallet'
import { SwitchBalance } from '@/pages/SwitchBalance'
import { CheckBalance } from '@/pages/CheckBalance'
import { UserDashboard } from '@/pages/UserDashboard'

export const PATHS = {
  main: '/',
  switchBalance: '/switch-balance',
  checkBalance: '/check-balance',
  userDashboard: '/user-dashboard',
}

export const Routes = () => {
  return (
    <Switch>
      <Route path={PATHS.main} component={ConnectWallet} exact />
      <Route path={PATHS.switchBalance} component={SwitchBalance} />
      <Route path={PATHS.checkBalance} component={CheckBalance} />
      <Route path={PATHS.userDashboard} component={UserDashboard} />
      <Redirect to={PATHS.main} />
    </Switch>
  )
}