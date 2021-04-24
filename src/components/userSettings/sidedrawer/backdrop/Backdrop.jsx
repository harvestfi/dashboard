import React, { useContext } from 'react'
import HarvestContext from '../../../../Context/HarvestContext'
import { BackdropContainer } from './BackdropStyles'

const Backdrop = () => {
  const { toggleSideDrawer } = useContext(HarvestContext)
  const backdropHander = () => {
    toggleSideDrawer()
  }
  return <BackdropContainer onClick={backdropHander}></BackdropContainer>
}

export default Backdrop
