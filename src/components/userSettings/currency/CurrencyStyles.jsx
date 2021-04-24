import styled from 'styled-components'
import { fonts } from '../../../styles/appStyles'

export const CurrencyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h3 {
    font-size: 1.7rem;
    margin: 1rem 0;
  }
  #currencies {
    font-family: ${fonts.headerFont};
    background-color: ${(props) => props.theme.style.blueBackground};
    display: flex;
    width: 6rem;
    scrollbar-color: ${(props) => props.theme.style.scrollBarColor};
    scrollbar-width: thin;
    ::-webkit-scrollbar {
      width: 0.5rem;
      height: 100%;
      margin-top: -1.8rem;
    }
    ::-webkit-scrollbar-track:no-button {
      width: 0.5rem;
      border-radius: 0.5rem;
      background-color: ${(props) => props.theme.style.lightBackground};
    }
    ::-webkit-scrollbar-button {
      color: ${(props) => props.theme.style.primaryFontColor};
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: black;
      background-color: ${(props) => props.theme.style.scrollBarColor};
    }

    option {
      font-family: ${fonts.contentFont};
      &:hover {
        font-family: ${fonts.headerFont};
      }
    }
  }
`
