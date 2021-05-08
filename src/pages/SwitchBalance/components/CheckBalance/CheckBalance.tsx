import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Panel, ValidationMessage } from './styles'
import { useStores } from '@/stores/utils'

type CheckBalanceProps = {}

export const CheckBalance: React.FC<CheckBalanceProps> = (props) => {
  const [address, setAddress] = useState()
  const { metaMaskStore } = useStores()

  const handleChange = (event: any) => {
    setAddress(event.target.value)
  }

  return (
    <>
      {metaMaskStore.validationMessage && (
        <motion.div
          key={metaMaskStore.validationMessage}
          initial={{ x: 0, y: -100, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ x: 0, y: -100, opacity: 1 }}
        >
          <ValidationMessage className="validation-message">
            <p>{metaMaskStore.validationMessage}</p>
          </ValidationMessage>
        </motion.div>
      )}

      <Panel>
        <div className="read-only-header">
          <h1>Or enter a wallet address for read-only mode</h1>
          <div className="address-input">
            <input
              type="text"
              value={address}
              placeholder="Enter address"
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          onClick={() => metaMaskStore.setAddressToCheck(address)}
          className="check-all button"
          type="button"
        >
          Check Balance
        </button>
      </Panel>
    </>
  )
}
