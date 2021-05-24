import React from 'react'
import { BackdropContainer } from './BackdropStyles'

const Backdrop = (props) => {
  const { toggleSideDrawer } = props
  return <BackdropContainer onClick={toggleSideDrawer}></BackdropContainer>
}

export default Backdrop
