import React from 'react'

import { Brand, Drawer, DrawerLink, Radio } from './SidedrawerStyles'
import logo from '../../../assets/newLogo.png'

import { Currency } from '../currency/Currency'
import Backdrop from './backdrop/Backdrop'
import ThemeSwitch from '../../tabContainer/themeSwitch/ThemeSwitch'
import { useCurrentAddress } from '@/hooks'

const Sidedrawer = (props) => {
  const { openDrawer, toggleRadio } = props
  const address = useCurrentAddress()

  return (
    <>
      <Drawer>
        <Brand>
          <img src={logo} alt="harvest finance logo" />{' '}
        </Brand>
        <DrawerLink
          href="https://farm.chainwiki.dev/en/home"
          target="_blank"
          rel="noopener noreferrer"
          className="drawer-link harvest"
        >
          harvest.finance
        </DrawerLink>
        <div className="wiki-radio">
          <DrawerLink
            href="https://farm.chainwiki.dev/en/home"
            target="_blank"
            rel="noopener noreferrer"
            className="drawer-link"
          >
            wiki
          </DrawerLink>
          <Radio onClick={toggleRadio} className="drawer-link radio">
            radio
          </Radio>
        </div>
        <div className="drawer-analytics">
          <h3 className="analytics-header">analytics</h3>
          <DrawerLink
            className="drawer-link"
            href="https://farmdashboard.xyz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            FARM statistics
          </DrawerLink>
          <DrawerLink
            className="drawer-link"
            href="https://duneanalytics.com/0xBoxer/-grain"
            target="_blank"
            rel="noopener noreferrer"
          >
            GRAIN statistics
          </DrawerLink>
          <DrawerLink
            className="drawer-link"
            href="https://cultivator.finance/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Profit calculator
          </DrawerLink>
          {address && (
            <DrawerLink
              className="drawer-link"
              href={`https://farmdashboard.xyz/history/${address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Address history
            </DrawerLink>
          )}
        </div>

        <div className="drawer-user-settings">
          <Currency />
          <ThemeSwitch />
        </div>
      </Drawer>
      {openDrawer ? <Backdrop /> : null}
    </>
  )
}

export default Sidedrawer
