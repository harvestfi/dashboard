import React from 'react'

import { Route, Redirect, Switch } from 'react-router-dom'

import { CheckBalance } from '@/pages/CheckBalance'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { EnterReadOnlyAddress } from '@/components/EnterReadOnlyAddress'

export const PATHS = {
  main: '/',
  checkBalance: '/check-balance/:address',
}

export const Routes = () => {
  return (
    <Switch>
      <ErrorBoundary>
        <Route path={PATHS.main} component={EnterReadOnlyAddress} exact />
        <Route path={PATHS.checkBalance} component={CheckBalance} />
        <Redirect to={PATHS.main} />
      </ErrorBoundary>
    </Switch>
  )
}
