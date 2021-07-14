import React, { useState, useRef } from 'react'

import {
  TooltipWrapContainer,
  TooltipCustomInner,
  TooltipCustomArrow,
  TooltipCustomWrap,
} from './styles'

import { observer } from 'mobx-react'

interface IProps {
  activator: JSX.Element
}

export const TooltipCustom: React.FC<IProps> = observer((props) => {
  const [hidden, setHidden] = useState(true)
  const [position, setPosition] = useState([0, 0])
  const tooltipRef = useRef(null)

  return (
    <TooltipWrapContainer ref={tooltipRef}>
      <div
        onMouseEnter={() => {
          setHidden(false)
          setPosition([
            Number(tooltipRef.current?.offsetHeight),
            Number(tooltipRef.current?.offsetLeft),
          ])
        }}
        onMouseLeave={() => {
          setHidden(true)
        }}
      >
        {props.activator}
        <TooltipCustomWrap
          hidden={hidden}
          style={{
            bottom: `${position[0]}px`,
            left: `${position[1]}px`,
          }}
          top
        >
          <TooltipCustomArrow top />
          <TooltipCustomInner top>{props.children}</TooltipCustomInner>
        </TooltipCustomWrap>
      </div>
    </TooltipWrapContainer>
  )
})
