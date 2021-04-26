import styled from 'styled-components'
import { Wrapper as BluePanelWrapper } from '../../components/bluePanel/BluePanel.styles'
import { LoadingBluePanel } from '../../components/bluePanel/components/loadingBluePanel/LoadingBluePanel.styles'

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  ${BluePanelWrapper}, ${LoadingBluePanel} {
    margin-right: 1rem;
  }
  ${BluePanelWrapper}:last-child, ${LoadingBluePanel}:last-child {
    margin-right: 0;
  }
  @media (max-width: 1107px) {
    display: flex;
    flex-direction: column-reverse;
    ${BluePanelWrapper}, ${LoadingBluePanel} {
      margin: 0;
      margin-bottom: 1rem;
    }
    ${BluePanelWrapper}:first-child, ${LoadingBluePanel}:first-child {
      margin-bottom: 0;
    }
  }
`
export default Container
