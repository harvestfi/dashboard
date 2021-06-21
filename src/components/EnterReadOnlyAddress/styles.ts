import styled from 'styled-components'
import { fonts } from '@/App/styles/appStyles'

export const Panel = styled.div`
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2rem auto;
    background-color: ${(props) => props.theme.style.panelBackground};
    color: ${(props) => props.theme.style.primaryFontColor};
    font-size: 1.7rem;
    font-family: ${fonts.contentFont};
    padding: 1rem 1.5rem 0rem 1.5rem;
    border: ${(props) => props.theme.style.mainBorder};
    border-radius: 0.5rem;
    box-sizing: border-box;
    box-shadow: ${(props) => props.theme.style.panelBoxShadow};
    z-index: 100;
    position: relative;
  }

  h1 {
    font-family: ${fonts.headerFont};
    margin-top: 10px;
    margin-bottom: 2.2rem;
    font-size: 2.5rem;
    text-align: center;
    position: relative;
  }
  .address-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      width: 30%;
      text-align: center;
      border-radius: 0.5rem;
      font-size: 1.7rem;
      font-family: ${fonts.contentFont};
    }
  }
  .button {
    width: max-content;
    margin: 2rem auto 2rem auto;
    font-size: 2rem;
    font-family: ${fonts.headerFont};
    position: relative;
    &:hover {
      top: 1.5px;
    }
  }
  .check-all {
    position: relative;
    &:hover {
      top: 1.5px;
    }
  }
  .clear {
    position: relative;
    z-index: 400;
  }
`
export const ValidationMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  background-color: ${(props) => props.theme.style.lightBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-family: ${fonts.contentFont};
  font-size: 2rem;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  margin: -5rem auto 0 auto;
  position: absolute;
  left: 0%;
  right: 0%;
  z-index: 100;
  @media (max-width: 768px) {
    left: 30%;
    right: 30%;
  }
  p {
    text-align: center;
  }
`
