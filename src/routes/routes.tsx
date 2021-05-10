import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { ConnectWallet } from '@/pages/ConnectWallet'
import { SwitchBalance } from '@/pages/SwitchBalance'
import { CheckBalance } from '@/pages/CheckBalance'
import { UserDashboard } from '@/pages/UserDashboard'

export const Routes = () => {
  return (
    <Router>
      <Route path="/" component={ConnectWallet} exact />
      <Route path="/switch-balance" component={SwitchBalance} />
      <Route path="/check-balance" component={CheckBalance} />
      <Route path="/user-dashboard" component={UserDashboard} />
    </Router>
  )
}
