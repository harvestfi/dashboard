import React, { useState, useContext } from 'react'
import { HarvestContext } from '../../Context/HarvestContext'
import {
  PanelTab,
  PanelTabContainer,
  PanelTabContainerLeft,
} from './TabContainerStyles'

import AnalyticsTabs from './analyticsTabs/AnalyticsTabs'

const TabContainer = () => {
  const { toggleRadio } = useContext(HarvestContext)

  const [showAnalytics, setShowAnalytics] = useState(false)
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
          // onMouseLeave={() => {
          //   setShowAnalytics(false);
          // }}
        >
          <p>analytics</p>
        </PanelTab>

        <AnalyticsTabs
          setShowAnalytics={setShowAnalytics}
          showAnalytics={showAnalytics}
        />
      </PanelTabContainerLeft>
    </PanelTabContainer>
  )
}

export default TabContainer
