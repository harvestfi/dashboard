import { Tooltip, TooltipArrow, TooltipInner } from 'styled-tooltip-component'
import styled from 'styled-components'

export const TooltipWrapContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`
export const TooltipCustomWrap = styled(Tooltip)`
  padding: 0;
  display: ${(props) => (props.hidden ? 'none' : 'block')};
  transition: all 0.5s ease-in-out 0.5s;
`

export const TooltipCustomInner = styled(TooltipInner)`
  background: #fff;
  border: 2px solid #000;
  color: #000;
  box-shadow: 0.35rem 0.35rem 0px #000;
  max-width: 500px;
  font-size: 13px;
`
export const TooltipCustomArrow = styled(TooltipArrow)`
  &::before {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    bottom: -8px;
    left: 50%;
    margin-left: -10px;
    border-top: 8px solid black;
  }
`
