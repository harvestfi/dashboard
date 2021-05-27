import React, { useState } from 'react'
import {
  PanelTab,
  PanelTabContainer,
  PanelTabContainerLeft,
} from './TabContainerStyles'

import { observer } from 'mobx-react'
import { AnalyticsTabs } from './analyticsTabs'
import { useStores } from '@/stores/utils'

const TabContainer: React.FC = observer(() => {
  const [showAnalytics, setShowAnalytics] = useState(false)
  const { appStore } = useStores()

  return (
    <PanelTabContainer>
      <PanelTabContainerLeft>
        <PanelTab>
          <a
            href="https://harvest.finance"
            target="_blank"
            rel="noopener noreferrer"
          >
            harvest.finance
          </a>
        </PanelTab>
        <PanelTab className="wiki-tab">
          <a
            href="https://farm.chainwiki.dev/en/home"
            target="_blank"
            rel="noopener noreferrer"
          >
            wiki
          </a>
        </PanelTab>
        <PanelTab className="radio-tab" onClick={appStore.toggleEnableRadio}>
          <p>radio</p>
        </PanelTab>
        <PanelTab
          className="analytics-tab"
          onMouseEnter={() => {
            setShowAnalytics(true)
          }}
        >
          <p>analytics</p>
        </PanelTab>

        <AnalyticsTabs
          showAnalytics={showAnalytics}
          address={appStore.address}
        />
      </PanelTabContainerLeft>
    </PanelTabContainer>
  )
})

export default TabContainer
