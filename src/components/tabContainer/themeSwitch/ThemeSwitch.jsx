import React, { useContext } from 'react'
import { HarvestContext } from '../../../Context/HarvestContext'
import { PanelTabContainerRight } from './ThemeSwitchStyles'

const ThemeSwitch = () => {
  const { state, setState } = useContext(HarvestContext)

  const toggleTheme = (theme) => {
    setState((prevState) => ({ ...prevState, theme }))
    window.localStorage.setItem('HarvestFinance:Theme', theme)
  }
  return (
    <PanelTabContainerRight>
      <h3>Current theme is: {state.theme}</h3>
      <label className="switch">
        <input
          type="checkbox"
          checked={state.theme === 'dark'}
          onChange={() =>
            toggleTheme(state.theme === 'dark' ? 'light' : 'dark')
          }
        />
        <span className="slider round" />
      </label>
    </PanelTabContainerRight>
  )
}

export default ThemeSwitch
