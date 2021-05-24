import React, { useState } from 'react'
import { Row, Col } from 'styled-bootstrap-grid'
import TabContainer from '@/components/tabContainer/TabContainer'
import SettingsModal from '@/components/userSettings/SettingsModal'

import Sidedrawer from '@/components/userSettings/sidedrawer/Sidedrawer'
import logo from '@/assets/newLogo.png'

import { Topbar, Brand } from '@/App/styles/AppJsStyles'

export const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const toggleUserSettings = () => {
    setSettingsOpen(!settingsOpen)
  }
  const toggleSideDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <>
      <Row>
        <Col col>
          <Topbar>
            <Brand>
              <img src={logo} alt="harvest finance logo" />{' '}
              {!openDrawer && <span>harvest.dashboard</span>}
            </Brand>
            <i
              onClick={toggleUserSettings}
              onKeyUp={toggleUserSettings}
              className="fas fa-user-cog"
              role="button"
              tabIndex="0"
            />
            {settingsOpen && (
              <SettingsModal toggleUserSettings={toggleUserSettings} />
            )}
            <i
              className="fas fa-bars"
              onClick={toggleSideDrawer}
              onKeyUp={toggleSideDrawer}
              role="button"
              tabIndex="0"
            />
          </Topbar>
        </Col>
      </Row>
      <TabContainer />
      <Sidedrawer />
    </>
  )
}
