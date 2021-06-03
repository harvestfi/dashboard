import React, { useCallback } from 'react'
import { PanelTabContainerRight } from './ThemeSwitchStyles'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'

const ThemeSwitch = observer(() => {
  const { settingsStore } = useStores()

  const theme = settingsStore.settings.theme.value

  const toggleTheme = useCallback(() => {
    const value = theme === 'dark' ? 'light' : 'dark'
    settingsStore.change('theme', value)
  }, [theme])

  return (
    <PanelTabContainerRight>
      <h3>Current theme is: {theme}</h3>
      <label className="switch">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <span className="slider round" />
      </label>
    </PanelTabContainerRight>
  )
})

export default ThemeSwitch
