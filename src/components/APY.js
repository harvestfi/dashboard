import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../styles/appStyles";

const BluePanel = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.style.blueBackground};
  color: ${(props) => props.theme.style.secondaryFontColor};
  font-family: ${fonts.contentFont};
  padding: 1.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 1.4rem;
  }
`;

const APY = ({ state }) => {
  const [pools, setPools] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [apy, setApy] = useState(0);

  useEffect(() => {
    getPools();
    setSummaries(state.summaries);
  }, [state.summaries]);

  useEffect(() => {
    calcApy();
    // eslint-disable-next-line 
  }, [summaries]);

  const getPools = async () => {
    const poolsData = await fetch(
      "https://api-ui.harvest.finance/pools?key=41e90ced-d559-4433-b390-af424fdc76d6",
    );

    setPools(await poolsData.json());
  };

  const calcApy = () => {
    for (let i = 0; i < pools.length; i++) {
      if (pools[i].id === "profit-sharing-farm") {
        setApy(pools[i].rewardAPY);
      }
    }
  };

  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      <BluePanel>
        <h1>{apy} %</h1>
        <span>Profit Share APY</span>
      </BluePanel>
    </ThemeProvider>
  );
};

export default APY;
