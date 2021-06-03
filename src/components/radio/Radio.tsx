import React from 'react'
import styled from 'styled-components'
import ReactModal from 'react-modal-resizable-draggable'
import { fonts } from '../../App/styles/appStyles'

import RadioPanel from './RadioPanel'
import { observer } from 'mobx-react'
import { useStores } from '@/stores/utils'

export const Radio: React.FC = observer(() => {
  const { appStore } = useStores()

  return (
    <ReactModal
      isOpen={appStore.isEnableRadio}
      onRequestClose={appStore.toggleEnableRadio}
      className={'my-modal-custom-class'}
      initWidth={325}
      initHeight={100}
      top={0}
      left={0}
      disableResize={true}
    >
      <RadioTitle>
        <h4>harvest radio</h4>
        <CloseIcon onClick={appStore.toggleEnableRadio}>
          <i className="fas fa-times-circle "></i>
        </CloseIcon>
      </RadioTitle>
      <RadioPanel />
    </ReactModal>
  )
})

const RadioTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: ${fonts.headerFont};
  font-size: 1.7rem;
  position: relative:
  z-index: 400;
  pointer-events: auto;
  h4 {
    margin-top: .2rem;
  }
`

const CloseIcon = styled.span`
  position: absolute;
  right: 1.3rem;
  top: 0.2rem;
  font-size: 1.7rem;
  cursor: pointer;
  color: ${(props) => props.theme.style.buttonFontColor};

  .fas {
    position: relative;
    z-index: 500;
    &:hover {
      top: 1.5px;
    }
  }
`
