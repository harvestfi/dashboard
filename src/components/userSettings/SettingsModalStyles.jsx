import styled from 'styled-components'
import { fonts } from '../../styles/appStyles'

export const UserSettings = styled.div`
  z-index: 200;
  position: absolute;
  right: 6rem;
  top: 3rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.style.lightBackground};
  font-family: ${fonts.contentFont};
  padding: 1%;
  .title {
    font-size: 2rem;
  }

  @media (max-width: 1160px) {
    display: none;
  }
`

export const CloseIcon = styled.span`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.style.buttonFontColor};

  .fas {
    font-size: 1.4rem;
    position: relative;
    &:hover {
      top: 1.5px;
    }
  }
`
