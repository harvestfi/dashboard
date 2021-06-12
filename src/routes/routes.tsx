import React from 'react'

import { Route, Redirect, Switch } from 'react-router-dom'

import { ConnectWallet } from '@/pages/ConnectWallet'
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
        <Route path={PATHS.main} component={ConnectWallet} exact />
        <Route path={PATHS.checkBalance} component={CheckBalance} />

        <Redirect to={PATHS.main} />
      </ErrorBoundary>
    </Switch>
  )
}
