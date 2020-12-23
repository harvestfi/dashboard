import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";

import APYSkeleton from "./APYSkeleton";

const BluePanel = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${(props) => props.theme.style.blueBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-family: ${fonts.headerFont};
  padding: 1.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};

  @media (max-width: 1002px) {
    margin-bottom: 3rem;
  }

  h1 {
    font-size: 2.4rem;
    margin-bottom: 0.5rem;
  }
  span {
    font-size: 1.3rem;
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
