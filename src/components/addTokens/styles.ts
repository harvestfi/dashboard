import styled from 'styled-components'
import { fonts } from '@/App/styles/appStyles'

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.theme.style.lightBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-size: 1.7rem;
  font-family: ${fonts.contentFont};
  padding: 1rem 1.5rem 0rem 1.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  margin-top: 30px;

  .inner {
    overflow-x: scroll;
    height: 16rem;
    scrollbar-color: ${({ theme }) => {
      return `${theme.style.scrollBarColor} ${theme.style.lightBackground}`
    }};
    scrollbar-width: thin;

    ::-webkit-scrollbar {
      width: 100%;
      height: 0.8rem;
      margin-top: -1.8rem;
    }
    ::-webkit-scrollbar-track:no-button {
      width: 100%;
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

    .token-container {
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      &.first {
        margin-bottom: 2rem;
      }

      @media (max-width: 1105px) {
        width: 90rem;
        margin: 0 auto;
      }
    }
  }

  h1 {
    font-family: ${fonts.headerFont};
    margin-bottom: 2.2rem;
    font-size: 2rem;
    text-align: center;
    position: relative;
  }

  @media (max-width: 1105px) {
    margin-bottom: 1.5rem;
    height: 32rem;
  }
`

export const Token = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 20%;

  &:hover {
    top: 0.2rem;
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: ${(props) => props.theme.style.primaryFontColor};
    font-family: ${fonts.contentFont};
  }

  img {
    height: 3.7rem;
    width: 3.7rem;
    margin-bottom: 0.5rem;
  }
  span {
    font-size: 1.5rem;
  }
`
