import React, { useState } from 'react'
import {
  PanelTab,
  PanelTabContainer,
  PanelTabContainerLeft,
} from './TabContainerStyles'

import { observer } from 'mobx-react'
import { AnalyticsTabs } from './analyticsTabs'
import { useCurrentAddress } from '../../hooks'

type TabContainerProps = {
  toggleRadio?(): void
}

const TabContainer: React.FC<TabContainerProps> = observer((props) => {
  const { toggleRadio } = props
  const [showAnalytics, setShowAnalytics] = useState(false)
  const address = useCurrentAddress()

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
        <PanelTab className="radio-tab" onClick={toggleRadio}>
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

        <AnalyticsTabs showAnalytics={showAnalytics} address={address} />
      </PanelTabContainerLeft>
    </PanelTabContainer>
  )
})

export default TabContainer
