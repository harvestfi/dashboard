import React, { useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import HarvestContext from '../../../Context/HarvestContext';
import { darkTheme, lightTheme, fonts } from '../../../styles/appStyles';

// Components
import FarmEarnedSkeleton from './FarmEarnedSkeleton';

const TotalFarmEarned = () => {
  const { state } = useContext(HarvestContext);

  return (
    <ThemeProvider theme={state.theme === 'dark' ? darkTheme : lightTheme}>
      {state.display ? (
        <BluePanel>
          <h1>{state.totalFarmEarned?.toFixed(6)}</h1>
          <span>Farm Earned</span>
        </BluePanel>
      ) : (
        <FarmEarnedSkeleton theme={state.theme} />
      )}
    </ThemeProvider>
  );
};

export default TotalFarmEarned;

const BluePanel = styled.div`
  position: relative;
  background-color: ${props => props.theme.style.blueBackground};
  color: ${props => props.theme.style.primaryFontColor};
  font-family: ${fonts.headerFont};
  padding: 2.5rem 0.7rem 2rem 0.7rem;
  border: ${props => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${props => props.theme.style.panelBoxShadow};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  h1 {
    font-size: 2.4rem;
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 1.3rem;
  }

  @media (max-width: 1107px) {
    padding: 1.5rem 0.7rem 4rem 1.5rem;
    margin: 1rem 0rem;
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
