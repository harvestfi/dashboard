import styled from 'styled-components'
import { fonts } from '@/styles/appStyles'

export const Main = styled.div`
  .farm-info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  @media (max-width: 1107px) {
    .farm-info {
      display: flex;
      flex-direction: column-reverse;
    }
  }
  .button-div {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    .clear {
      position: relative;
      z-index: 400;
    }
  }
`
