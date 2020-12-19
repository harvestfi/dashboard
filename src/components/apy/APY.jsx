import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";

import APYSkeleton from "./APYSkeleton";

const BluePanel = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.style.blueBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-family: ${fonts.headerFont};
  padding: 2.5rem 0.7rem 2rem 0.7rem;
  margin-top: 0.1rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 2.4rem;
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 1.3rem;
  }

  @media (max-width: 1107px) {
    padding: 3.63rem 0.7rem 7.2rem 1.5rem;
    margin-right: 0px;
    h1 {
      font-size: 2.2rem;
      position: relative;
      top: 1.2rem;
    }
    span {
      font-size: 1.1rem;
      position: relative;
      top: 1.2rem;
    }
  }
`;

const APY = ({ apy, display, theme }) => {
  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      {display ? (
        <BluePanel>
          <h1>{apy} %</h1>
          <span>Profit Share APY</span>
        </BluePanel>
      ) : (
        <APYSkeleton theme={theme} />
      )}
    </ThemeProvider>
  );
};

export default APY;
