import React from 'react'
import Button from '@/components/Button'
import { Panel } from '@/App/styles/AppJsStyles'
import { useHistory } from 'react-router-dom'
import { PATHS } from '@/routes'

type UserDashboardProps = {}

export const UserDashboard: React.FC<UserDashboardProps> = (props) => {
  const history = useHistory()

  const goDashboard = () => {
    history.push(PATHS.userDashboard)
  }

  return (
    <>
      <div className="mode-select-container">
        <Panel className="mode-select-user">
          <h1>Check your farming status</h1>
          <Button onClick={goDashboard}>Go to user dashboard</Button>
        </Panel>
      </div>
    </>
  )
}
