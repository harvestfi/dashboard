import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../../styles/appStyles";

const SkeletonPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 10rem;
  background: none;
  border: ${(props) => props.theme.style.mainBorder};
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  border-radius: 0.5rem;
  overflow: hidden;

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

  @media (max-width: 1107px) {
    height: 16rem;
  }
`;

const APYSkeleton = ({ theme }) => {
  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <SkeletonPanel></SkeletonPanel>
    </ThemeProvider>
  );
};

export default APYSkeleton;
