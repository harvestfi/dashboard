import React, { useContext } from 'react'
import { Tab, Tabs, Button } from 'components'
import { shortenAddress } from 'utils'
import HarvestContext from 'Context/HarvestContext'

const TopTabsContainer = () => {
  const { state, disconnect } = useContext(HarvestContext)
  const { address } = state

  function openInNewTab(url) {
    window.open(url, '_blank')
  }

  const onDisconnect = () => {
    if (address) disconnect()
  }

  const AccountTab = () => {
    if (address) {
      return (
        <Tab className="wallet-address-container" noHover>
          <span>{shortenAddress(address)}</span>
          <Button size="small" onClick={onDisconnect}>
            Disconnect
          </Button>
        </Tab>
      )
    }
    return <></>
  }

  return (
    <Tabs className="top-tabs-container">
      <Tab
        selected
        active
        onClick={() => openInNewTab('https://harvest.finance/')}
      >
        harvest.finance
      </Tab>
      <Tab onClick={() => openInNewTab('https://farm.chainwiki.dev/en/home')}>
        wiki
      </Tab>
      <Tab active>radio</Tab>
      <Tab>analytics</Tab>

      {AccountTab()}
    </Tabs>
  )
}

export default TopTabsContainer
