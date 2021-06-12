import React from 'react'

import { Route, Redirect, Switch } from 'react-router-dom'

import { SwitchBalance } from '@/pages/SwitchBalance'
import { CheckBalance as CheckBalanceComponent } from '@/pages/SwitchBalance/components/CheckBalance'
import { CheckBalance } from '@/pages/CheckBalance'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export const PATHS = {
  main: '/',
  switchBalance: '/switch-balance',
  checkBalance: '/check-balance/:address',
  userDashboard: '/user-dashboard',
}

export const Routes = () => {
  return (
    <Switch>
      <ErrorBoundary>
        <Route path={PATHS.main} component={CheckBalanceComponent} exact />
        <Route path={PATHS.switchBalance} component={SwitchBalance} />
        <Route path={PATHS.checkBalance} component={CheckBalance} />

        <Redirect to={PATHS.main} />
      </ErrorBoundary>
    </Switch>
  )
}
