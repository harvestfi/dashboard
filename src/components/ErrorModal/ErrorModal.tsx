import React from 'react'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'
import * as Styled from './styles'

export const ErrorModal: React.FC = observer(() => {
  const { errorModalStore } = useStores()

  return (
    <Styled.Container isOpen={errorModalStore.display}>
      <Styled.Inner>
        <h4 className="error-title">Whoa, partner!</h4>
        <p>{errorModalStore.message}</p>
        <Styled.CloseIcon onClick={errorModalStore.close}>
          <i className="fas fa-times-circle fa-2x"></i>
        </Styled.CloseIcon>
      </Styled.Inner>
    </Styled.Container>
  )
})
