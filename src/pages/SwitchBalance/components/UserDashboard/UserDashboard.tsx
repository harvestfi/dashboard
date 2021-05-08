import React from 'react'
import Button from '@/components/Button'
import { Panel } from '@/styles/AppJsStyles'

type UserDashboardProps = {
  onGoDashboard(): void
}

export const UserDashboard: React.FC<UserDashboardProps> = (props) => {
  const { onGoDashboard } = props

  return (
    <>
      <div className="mode-select-container">
        <Panel className="mode-select-user">
          <h1>Check your farming status</h1>
          <Button onClick={onGoDashboard}>Go to user dashboard</Button>
        </Panel>
      </div>
    </>
  )
}
