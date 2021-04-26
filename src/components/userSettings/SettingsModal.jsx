import React, { useContext } from 'react'
import { HarvestContext } from '../../Context/HarvestContext'
import { UserSettings, CloseIcon } from './SettingsModalStyles'

//components
import ThemeSwitch from '../tabContainer/themeSwitch/ThemeSwitch'
import Currency from './currency/Currency'

const SettingsModal = () => {
  const { toggleUserSettings } = useContext(HarvestContext)

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
