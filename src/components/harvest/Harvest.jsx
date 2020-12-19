import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import harvest from "../../lib/index.js";
const { utils, ethers } = harvest;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.theme.style.lightBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  padding: 1.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  
  input[type="number"] {
    margin: 0 1rem;
  }

  @media only screen and (max-width: 990px) {
    margin-bottom: 1.5rem;
  }

  .panel-text {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 2rem;
    font-family: ${fonts.contentFont};
    .button {
      margin-left: 1rem;
      font-size: 1.5rem;
      padding: .3rem 1rem;
      font-family: ${fonts.headerFont};
    }
    @media(max-width:1340px) {
      font-size: 1.6rem
    }
    @media(1340px) {
      font-size: 1.6rem
    }

   
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;

 
  button {
    width: 14.5rem;
    font-size: 2rem;
    font-family: ${fonts.headerFont};
    position: relative;
    margin-top: 4px;
    margin-right: .5rem;
    
    &:hover {
      top: 1.5px;
    }

    .button.clear {
      margin-left: 1rem;
    }

    
  }
  
    
  }
`;

const Harvest = ({ state, setState }) => {
  const harvest = async () => {
    const activePools = state.manager.pools;

    for (let i = 0; i < activePools.length; i++) {
      await activePools[i]
        .earnedRewards(state.address)
        .then((res) => {
          if (
            state.minimumHarvestAmount * 1000000000000 <=
            parseFloat((res.toString() / 1000000).toFixed(10))
          ) {
            //The original code here would harvest all farms regardless of the amount specified.
            //Now it checks if the rewards are equal to or above specfied amount before harvesting
            activePools[i]
              .getReward()
              .catch((e) => console.log("Rejected Transaction"));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setState({ ...state, minimumHarvestAmount: 0 });
  };

  //   const getMinRewards= () => {
  //     let result = state.summaries.map(utils.prettyPosition)
  //     let min = 10;
  //     for(let i = 0; i < result.length; i++) {
  //          if (result[i].earnedRewards > 0 && result[i].earnedRewards < min ) {
  //            min = result[i].earnedRewards
  //          }
  //     }
  //     console.log(min)
  //     setState({...state,minimumHarvestAmount: min})
  //  }

  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      <Panel>
        <div className="panel-text">
          <p>
            Harvest all with at least
            <input
              type="number"
              onChange={(event) =>
                setState({ ...state, minimumHarvestAmount: event.target.value })
              }
              placeholder="min"
              value={state.minimumHarvestAmount}
              step="any"
            />
            FARM
          </p>
          {state.minimumHarvestAmount === 0 ? (
            ""
          ) : (
            <button
              className="button clear"
              onClick={(event) =>
                setState({ ...state, minimumHarvestAmount: 0 })
              }
            >
              clear
            </button>
          )}
        </div>

        <ButtonContainer>
          <button
            className="button"
            disabled={!state.provider || state.minimumHarvestAmount === 0}
            onClick={harvest}
          >
            harvest all
          </button>
        </ButtonContainer>
      </Panel>
    </ThemeProvider>
  );
};

export default Harvest;
