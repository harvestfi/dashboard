import styled from 'styled-components'

import { fonts } from '@/App/styles/appStyles'

export const WelcomeTextPanel = styled.div`
  position: relative;
  padding: 2.5rem 2.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 1rem;
  border-top-left-radius: 0.5rem;
  background-color: ${(props) => props.theme.style.panelBackground};
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 1.6rem;
  color: ${(props) => props.theme.style.primaryFontColor};

  h1 {
    font-size: 2.8rem;
    font-family: ${fonts.headerFont};
    margin: 1rem 0;
  }
  h4 {
    font-size: 2rem;
    font-family: ${fonts.contentFont};
    margin: 1rem 0;
  }
  h6 {
    font-family: ${fonts.headerFont};
    width: 60%;
    margin: 1rem auto;
    font-family: ${fonts.contentFont};
    font-size: 1.2rem;
  }
  button {
    font-size: 2.2rem;
    font-family: ${fonts.headerFont};
    margin: 1rem 0;
    position: relative;
    &:hover {
      top: 1.5px;
    }
  }
  .foot-note {
    font-family: ${fonts.contentFont};
    width: 25%;
    margin: 1rem auto;
    line-height: 1.8rem;
    font-size: 1.1rem;
  }
  @media (max-width: 1100px) {
    .foot-note {
      width: 50%;
    }
  }

  @media (max-width: 600px) {
    .foot-note {
      width: 50%;
    }
  }
`
