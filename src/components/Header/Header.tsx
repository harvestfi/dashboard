import React from 'react'
import { Row, Col } from 'styled-bootstrap-grid'
import { TabContainer } from '@/components/tabContainer/TabContainer'
import { SettingsModal } from '@/components/userSettings/SettingsModal'
import logo from '@/assets/newLogo.png'
import { PATHS } from '@/routes'
import { observer } from 'mobx-react'
import { useStores } from '@/stores/utils'
import { useHistory } from 'react-router-dom'

import { Topbar, Brand } from '@/App/styles/AppJsStyles'

export const Header = observer(() => {
  const { appStore } = useStores()
  const history = useHistory()

  return (
    <>
      <Row>
        <Col col>
          <Topbar>
            <Brand
              onClick={() => {
                history.push(PATHS.main)
              }}
            >
              <img src={logo} alt="harvest finance logo" />{' '}
              {!appStore.isOpenDrawer && <span>harvest.dashboard</span>}
            </Brand>
            <i
              onClick={appStore.toggleOpenUserSettings}
              onKeyUp={appStore.toggleOpenUserSettings}
              className="fas fa-user-cog"
              role="button"
              tabIndex={0}
            />
            {appStore.isOpenUserSettings && (
              <SettingsModal
                toggleUserSettings={appStore.toggleOpenUserSettings}
              />
            )}
            <i
              className="fas fa-bars"
              onClick={appStore.toggleOpenDrawer}
              onKeyUp={appStore.toggleOpenDrawer}
              role="button"
              tabIndex={0}
            />
          </Topbar>
        </Col>
      </Row>
      <TabContainer />
    </>
  )
})
