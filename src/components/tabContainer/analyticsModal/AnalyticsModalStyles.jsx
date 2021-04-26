import styled from 'styled-components'

export const Modal = styled.div`
  &.show {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: ${(state) => state.theme.style.mainBorder};
    background-color: ${(state) => state.theme.style.highlight};
    position: absolute;
    z-index: 500;
    width: max-content;
    left: 8rem;
    top: -0.8rem;
    border-radius: 0.8rem;
    padding: 1.5rem;
    transition: all 0.2s ease;

    .analyti-link {
      font-size: 1.9rem;
      position: relative;
      background-color: ${(state) => state.theme.style.wikiTabBackground};
      border-radius: 0.8rem;
      margin: 1.5rem 0;
      padding: 1rem;
      transition: all 0.2s ease;
      width: max-content;

      &:hover {
        top: 0.5rem;
      }
      @media (max-width: 768px) {
        top: 2rem;
      }
    }

    @media (max-width: 500px) {
      left: 0;
      right: 8rem;
      margin: auto;
    }
  }

  &.hidden {
    display: none;
    transition: all 0.3s ease-out;
  }
`

export const CloseIcon = styled.span`
  position: absolute;
  right: 2rem;
  top: 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${(props) => props.theme.style.buttonFontColor};

  .fas {
    position: relative;
    &:hover {
      top: 1.5px;
    }
  }
  @media (min-width: 768px) {
    display: none;
  }
`
