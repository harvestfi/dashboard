import React from 'react'
import * as Styled from './styles'
import logo from '@/assets/newLogo.png'

import { Currency } from '@/components/userSettings/currency/Currency'
import { Backdrop } from './Backdrop'
import ThemeSwitch from '@/components/tabContainer/themeSwitch/ThemeSwitch'

import { observer } from 'mobx-react'
import { useStores } from '@/stores/utils'

export const SideDrawer = observer(() => {
  const { appStore } = useStores()

  if (!appStore.isOpenDrawer) {
    return null
  }

  return (
    <>
      <Styled.Drawer>
        <Styled.Brand>
          <img src={logo} alt="harvest finance logo" />{' '}
        </Styled.Brand>
        <Styled.DrawerLink
          href="https://farm.chainwiki.dev/en/home"
          target="_blank"
          rel="noopener noreferrer"
          className="drawer-link harvest"
        >
          harvest.finance
        </Styled.DrawerLink>
        <div className="wiki-radio">
          <Styled.DrawerLink
            href="https://farm.chainwiki.dev/en/home"
            target="_blank"
            rel="noopener noreferrer"
            className="drawer-link"
          >
            wiki
          </Styled.DrawerLink>
          <Styled.Radio
            onClick={appStore.toggleEnableRadio}
            className="drawer-link radio"
          >
            radio
          </Styled.Radio>
        </div>
        <div className="drawer-analytics">
          <h3 className="analytics-header">analytics</h3>
          <Styled.DrawerLink
            className="drawer-link"
            href="https://farmdashboard.xyz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            FARM statistics
          </Styled.DrawerLink>
          <Styled.DrawerLink
            className="drawer-link"
            href="https://duneanalytics.com/0xBoxer/-grain"
            target="_blank"
            rel="noopener noreferrer"
          >
            GRAIN statistics
          </Styled.DrawerLink>
          <Styled.DrawerLink
            className="drawer-link"
            href="https://cultivator.finance/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Profit calculator
          </Styled.DrawerLink>

          {appStore.address && (
            <Styled.DrawerLink
              className="drawer-link"
              href={`https://farmdashboard.xyz/history/${appStore.address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Address history
            </Styled.DrawerLink>
          )}
        </div>

        <div className="drawer-user-settings">
          <Currency />
          <ThemeSwitch />
        </div>
      </Styled.Drawer>
      {appStore.isOpenDrawer && (
        <Backdrop toggleSideDrawer={appStore.toggleOpenDrawer} />
      )}
    </>
  )
})
