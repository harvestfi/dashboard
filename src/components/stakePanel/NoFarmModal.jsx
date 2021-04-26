import React from 'react'
import styled, { css } from 'styled-components'
import { fonts } from '../../styles/appStyles'

const Container = styled.div`
  ${({ isOpen }) => {
    if (isOpen) {
      return css`
        display: flex;
        position: fixed;
        width: 110vw;
        height: 110vh;
        background-color: #07070767;
        top: 0%;
        transform: translateY(50%);
        transform: translateX(-50%);
        z-index: 200;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        @media (max-width: 990px) {
          transform: translateX(-8%);
        }
        @media (max-width: 600px) {
          transform: translateX(-12%);
        }
      `
    } else {
      return css`
        display: none;
      `
    }
  }}
`

const Inner = styled.div`
  background-color: ${(props) => props.theme.style.wikiTabBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  border-radius: 1.2rem;
  width: 56rem;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;
  bottom: 10%;
  border: ${(props) => props.theme.style.mainBorder};
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  .error-title {
    font-family: ${fonts.headerFont};
    font-size: 2.6rem;
    margin: 1rem 0;
  }

  p {
    font-size: 2.1rem;
    line-height: 24px;

    font-family: ${fonts.contentFont};
    margin-bottom: 0;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.style.buttonFontColor};
    font-family: ${fonts.headerFont};
  }

  button {
    margin-top: 1rem;
    font-size: 1.9rem;
    position: relative;

    &:hover {
      top: 1.5px;
    }
  }
  @media (max-width: 600px) {
    width: 80%;
    margin: 0 auto;
  }
`

const CloseIcon = styled.span`
  position: absolute;
  right: 2rem;
  top: 2rem;
  font-size: 1.2rem;
  font-family: ${fonts.headerFont};
  cursor: pointer;

  .fas {
    color: ${(props) => props.theme.style.primaryFontColor};
    position: relative;
    &:hover {
      top: 1.5px;
    }
  }
`

const NoFarmModal = ({ modal, onClose }) => (
  <Container isOpen={modal.open}>
    <Inner>
      <h4 className="error-title">Hold up, partner!</h4>
      <p>{modal.message}</p>
      {modal.noFarm ? (
        <button className="button">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://app.uniswap.org/#/swap?inputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&outputCurrency=0xa0246c9032bC3A600820415aE600c6388619A14D"
          >
            Buy Farm!
          </a>
        </button>
      ) : (
        ''
      )}

      <CloseIcon onClick={onClose}>
        <i className="fas fa-times-circle fa-2x"></i>
      </CloseIcon>
    </Inner>
  </Container>
)

export default NoFarmModal
