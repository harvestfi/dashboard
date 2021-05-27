import React from 'react'
import { BackdropContainer } from './styles'

type BackdropProps = {
  toggleSideDrawer: any
}

export const Backdrop: React.FC<BackdropProps> = (props) => {
  const { toggleSideDrawer } = props
  return <BackdropContainer onClick={toggleSideDrawer}></BackdropContainer>
}
