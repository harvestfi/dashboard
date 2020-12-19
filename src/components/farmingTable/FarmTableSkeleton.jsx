import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../../styles/appStyles";

const SkeletonPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 200px;
  background-color: ${(props) => props.theme.style.panelBackground};
  border: ${(props) => props.theme.style.mainBorder};
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
  z-index: 300;

  .skeleton-header {
    margin: 0;
    height: 6rem;
    width: 100%;
    border-bottom: 2px solid black;
  }

  &::before {
    content: "";
    position: relative;
    left: -150px;
    top: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      to right,
      transparent 10%,
      ${(props) => props.theme.style.blueBackground} 50%,
      transparent 100%
    );
    animation: load 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes load {
    from {
      left: -100%;
    }
    to {
      left: 100%;
    }
  }
`;

const PanelTabContainerLeft = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const PanelTab = styled.div`
  width: 240px;
  height: 4.5rem;
  margin-right: 0.75rem;
  border-radius: 1.2rem;
  border-top: ${(props) => props.theme.style.mainBorder};
  border-left: ${(props) => props.theme.style.mainBorder};
  border-right: ${(props) => props.theme.style.mainBorder};
  padding: 0.75rem 2rem 2rem 2rem;
  background-color: ${(props) => props.theme.style.panelBackground};
  box-shadow: ${(props) => props.theme.style.panelTabBoxShadow};
  position: relative;
  top: 1.2rem;

  &::before {
    content: "";
    position: relative;
    left: -150px;
    top: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      to right,
      transparent 10%,
      ${(props) => props.theme.style.blueBackground} 50%,
      transparent 100%
    );
    animation: load 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes load {
    from {
      left: -100%;
    }
    to {
      left: 100%;
    }
  }
`;

const FarmTableSkeleton = ({ state }) => {
  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      <PanelTabContainerLeft>
        <PanelTab></PanelTab>
      </PanelTabContainerLeft>
      <SkeletonPanel></SkeletonPanel>
    </ThemeProvider>
  );
};

export default FarmTableSkeleton;
