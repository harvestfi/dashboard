import React, { useContext } from 'react'
import { HarvestContext } from '../../../Context/HarvestContext'
import { AnalyticsContainer } from './AnalyticsTabsStyles'

import { PanelTab } from '../TabContainerStyles'
const AnalyticsTabs = ({ showAnalytics, setShowAnalytics }) => {
  const { state } = useContext(HarvestContext)
  return (
    <AnalyticsContainer onMouseLeave={() => setShowAnalytics(false)}>
      <PanelTab
        className={
          showAnalytics
            ? 'analytics-tab unfolded unfolded-first'
            : 'analytics-tab folded first'
        }
      >
        <a
          className="analyti-link first"
          href="https://farmdashboard.xyz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          FARM statistics
        </a>
      </PanelTab>
      <PanelTab
        className={
          showAnalytics
            ? 'analytics-tab unfolded unfolded-second'
            : 'analytics-tab folded second'
        }
      >
        <a
          className="analyti-link"
          href="https://duneanalytics.com/0xBoxer/-grain"
          target="_blank"
          rel="noopener noreferrer"
        >
          GRAIN analytics
        </a>
      </PanelTab>
      <PanelTab
        className={
          showAnalytics
            ? 'analytics-tab unfolded unfolded-third'
            : 'analytics-tab folded third'
        }
      >
        <a
          className="analyti-link"
          href="https://cultivator.finance/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Profit calculator
        </a>
      </PanelTab>
      {state.address ? (
        <PanelTab
          className={
            showAnalytics
              ? 'analytics-tab unfolded unfolded-fourth'
              : 'analytics-tab folded fourth'
          }
        >
          <a
            className="analyti-link"
            href={`https://farmdashboard.xyz/history/${state.address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Address history
          </a>
        </PanelTab>
      ) : null}
    </AnalyticsContainer>
  )
}

export default AnalyticsTabs
