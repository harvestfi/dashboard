import React from 'react'
import { UserSettings, CloseIcon } from './SettingsModalStyles'

import ThemeSwitch from '../tabContainer/themeSwitch/ThemeSwitch'
import { Currency } from './currency/Currency'

type SettingsModalProps = {
  toggleUserSettings(): void
}

const SettingsModal: React.FC<SettingsModalProps> = (props) => {
  const { toggleUserSettings } = props

  return (
    <UserSettings>
      <CloseIcon onClick={toggleUserSettings}>
        <i className="fas fa-times-circle"></i>
      </CloseIcon>
      <Currency />
      <ThemeSwitch />
    </UserSettings>
  )
}

export default SettingsModal
