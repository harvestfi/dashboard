import React, { useContext } from 'react'
import { HarvestContext } from '../../../Context/HarvestContext'
import { Modal, CloseIcon } from './AnalyticsModalStyles'

const AnalyticsModal = ({ showAnalytics, setShowAnalytics }) => {
  const { state } = useContext(HarvestContext)
  return (
    <Modal className={showAnalytics ? 'show' : 'hidden'}>
      <CloseIcon onClick={() => setShowAnalytics(false)}>
        <i className="fas fa-times-circle fa-2x"></i>
      </CloseIcon>
      <a
        className="analyti-link first"
        href="https://farmdashboard.xyz/"
        target="_blank"
        rel="noopener noreferrer"
      >
        FARM statistics
      </a>

      <a
        className="analyti-link"
        href="https://duneanalytics.com/0xBoxer/-grain"
        target="_blank"
        rel="noopener noreferrer"
      >
        GRAIN analytics
      </a>

      {state.address ? (
        <a
          className="analyti-link"
          href={`https://farmdashboard.xyz/history/${state.address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Address history
        </a>
      ) : null}
    </Modal>
  )
}

export default AnalyticsModal
