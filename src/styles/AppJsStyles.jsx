import styled, { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import { fonts } from './appStyles';

export const GlobalStyle = createGlobalStyle`
${reset}


html {
  /* 1rem = 10px */
  font-size: 62.5%;
  height: 100%;
}



body {
  height: 100%;
  background-color: ${props => props.theme.style.bodyBackground};
}


code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

#WEB3_CONNECT_MODAL_ID {
    position: relative;
    z-index: 1200;

    .web3modal-modal-card {
      background-color: ${props => props.theme.style.lightBackground};
      font-family: ${fonts.headerFont};
      border: ${props => props.theme.style.mainBorder};

      .web3modal-provider-container {
        background-color: ${props => props.theme.style.highlight};

        .web3modal-provider-description {
          color: ${props => props.theme.style.primaryFontColor};
          font-family: ${fonts.contentFont};
        }
        &:hover {
          border: ${props => props.theme.style.smallBorder};
        }
      }

      
    }
  }


input[type="number"] {
  -moz-appearance: textfield;
  background-color: ${props => props.theme.style.lightBackground};
  border: 0.2rem solid #363636;
  font-size: 1.4rem;
  color: ${props => props.theme.style.primaryFontColor};
  width: 6rem;
  text-align: center;
  border-radius: 0.5rem;
  padding: 0.3rem 0.7rem;
  @media(max-width: 1400px) {
    width: 6rem;
  }
  @media(max-width: 1280px) {
    width: 5rem;
  }
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
}

.button {
  background: ${props => props.theme.style.highlight};
  border: ${props => props.theme.style.smallBorder};
  box-shadow: ${props => props.theme.style.buttonBoxShadow};
  box-sizing: border-box;
  border-radius: 0.8rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: TechnaSans;
  color: ${props => props.theme.style.buttonFontColor};
  font-size: 1.2rem;

  &.ghost {
    background: transparent;
    border: 0px;
    box-shadow: none;
    color: ${props => props.theme.style.linkColor};
    font-family: ${fonts.headerFont};
    padding: 0px;
  }

  &.alert {
    background-color: ${props => props.theme.style.alertColor}
  }
}

.spread-row {
  justify-content: space-between;
}

div[data-name="row"] {
  margin-bottom: 1.5rem;
}
`;

export const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .fa-user-cog {
    color: ${props => props.theme.style.brandTextColor};
    font-size: 2.5rem;
    margin-right: 1rem;
    position: relative;

    &:hover {
      cursor: pointer;
      top: 0.2rem;
    }
    @media (max-width: 1160px) {
      display: none;
    }
  }
  .fa-bars {
    color: ${props => props.theme.style.brandTextColor};
    font-size: 2.5rem;

    padding-right: 1rem;
    position: relative;

    &:hover {
      cursor: pointer;
      top: 0.2rem;
    }

    @media (min-width: 1160px) {
      display: none;
    }
  }
`;

// App
export const Brand = styled.div`
  padding-right: 1rem;
  padding-top: 2rem;
  display: flex !important;
  align-items: center;
  padding-bottom: 2rem;

  img {
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 1rem;
    margin-left: 0.5rem;
  }

  span {
    color: ${props => props.theme.style.brandTextColor};
    font-family: ${fonts.contentFont};
    font-size: 2.5rem;
    line-height: 35px;
  }

  @media (min-width: 1500px) {
    margin: 3rem 0;
  }
`;

export const Panel = styled.div`
  position: relative;
  padding: 2.5rem 2.5rem;
  border: ${props => props.theme.style.mainBorder};
  border-radius: 1rem;
  border-top-left-radius: 0rem;
  margin-top: -1.5rem;
  background-color: ${props => props.theme.style.panelBackground};
  z-index: 50;
  box-shadow: ${props => props.theme.style.panelBoxShadow};

  &.four-corner {
    border-top-left-radius: 1rem;
    background-color: #1d1d1d;
    color: ${props => props.theme.style.primaryFontColor};
    font-size: 1.6rem;
    font-family: TechnaSans;
  }

  //Radio Modal
  .flexible-modal {
    position: absolute;
    z-index: 51;
    background-color: #ddd;
    height: 2rem;
    border: 1px solid black;
    border-radius: 0.5rem;
    background-color: ${props => props.theme.style.highlight};
    box-shadow: ${props => props.theme.style.panelTabBoxShadow};
    margin-bottom: 0;
  }

  .flexible-modal-mask {
    display: none;
  }
  .flexible-modal-resizer {
    height: 2rem;
  }

  .flexible-modal-drag-area {
    background-color: transparent;
    position: absolute;
    cursor: grab;
    height: 2rem;
    right: 0;
    top: 0;
  }
  .flexible-modal-drag-area-bottom {
    height: 3rem;
    cursor: grab;
    position: absolute;
    bottom: 0;
  }
  .flexible-modal-drag-area-right {
    position: absolute;
    height: 5rem;
    width: 2rem;
    top: 0;
    right: 0;
    cursor: grab;
  }
  .flexible-modal-drag-area-left {
    position: absolute;
    height: 5rem;
    width: 2rem;
    top: 0;
    left: 0;
    cursor: grab;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 15rem;
  @media (max-width: 1140px) {
    width: 95%;
  }
`;
