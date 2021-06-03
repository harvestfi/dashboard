import React from 'react'
import { AnalyticsContainer } from './AnalyticsTabsStyles'
import { PanelTab } from '../TabContainerStyles'

type AnalyticsTabsProps = {
  address: string | null
  showAnalytics: boolean
}

export const AnalyticsTabs: React.FC<AnalyticsTabsProps> = (props) => {
  const { address, showAnalytics } = props

  return (
    <AnalyticsContainer>
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
      {address && (
        <PanelTab
          className={
            showAnalytics
              ? 'analytics-tab unfolded unfolded-fourth'
              : 'analytics-tab folded fourth'
          }
        >
          <a
            className="analyti-link"
            href={`https://farmdashboard.xyz/history/${address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Address history
          </a>
        </PanelTab>
      )}
    </AnalyticsContainer>
  )
}
