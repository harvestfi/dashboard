import React, { useContext } from 'react'
import styled from 'styled-components'
// import { ethers } from 'ethers';
import { HarvestContext } from '../../Context/HarvestContext'
import { fonts } from '../../styles/appStyles'

const Harvest = () => {
  const {
    state,
    setState,
    harvestAndStakeMessage,
    setHarvestAndStakeMessage,
  } = useContext(HarvestContext)

  // const [isHarvesting, setHarvesting] = useState(false);

  const harvest = async () => {
    // setHarvesting(true);
    setState((prevState) => ({ ...prevState, minimumHarvestAmount: '0' }))

    setHarvestAndStakeMessage({
      ...harvestAndStakeMessage,
      first: 'Harvesting your rewards.',
      second: '',
    })
    // await state.manager
    // 	.getRewards(ethers.utils.parseUnits(state.minimumHarvestAmount, 18))
    // 	.then(async vals => {
    // 		let i = 0;
    // 		while (i < vals.length) {
    // 			await vals[i].getReward.wait();
    // 			// eslint-disable-next-line no-plusplus
    // 			i++;
    // 		}
    // 	})
    // 	.catch(err => {
    // 		if (err.code === 4001) {
    // 			console.log('Transaction rejected.');
    // 		}
    // 	});

    setHarvestAndStakeMessage({
      ...harvestAndStakeMessage,
      first: ``,
      second: '',
    })
    // setHarvesting(false);
  }

  // const pool = state.manager.pools.find(pool => {
  //   return pool.address === '0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50';
  // });

  const stake = async () => {
    // const allowance = await pool.lptoken.allowance(state.address, pool.address);
    // const amount =
    //   state.minimumHarvestAmount > 0
    //     ? ethers.utils.parseUnits(state.minimumHarvestAmount.toString(), 18)
    //     : await pool.unstakedBalance(state.address);
    // await pool
    //   .stake(amount)
    //   .then(async res => {
    //     setHarvestAndStakeMessage({
    //       ...harvestAndStakeMessage,
    //       first: 'Staking your FARM',
    //       second: '',
    //     });
    //     await res.wait().then(() => {
    //       setHarvesting(false);
    //       setHarvestAndStakeMessage({
    //         ...harvestAndStakeMessage,
    //         first: `Success!`,
    //         second: `Your FARM has been staked!`,
    //       });
    //       const timer = setTimeout(() => {
    //         setHarvestAndStakeMessage({
    //           ...harvestAndStakeMessage,
    //           first: ``,
    //           second: '',
    //         });
    //       }, 2500);
    //       return () => clearTimeout(timer);
    //     });
    //   })
    //   .catch(e => {
    //     if (e.code !== 4001 || e.code !== -32603) {
    //       setHarvesting(false);
    //       setHarvestAndStakeMessage({
    //         ...harvestAndStakeMessage,
    //         first: ``,
    //         second: '',
    //       });
    //       console.log(`You do not have enough to stake ${ethers.utils.formatEther(amount)} FARM`);
    //     }
    //   });
  }

  const harvestAllAndStake = async () => {
    // console.log('harvesting');
    // setHarvesting(true);
    // setHarvestAndStakeMessage({
    //   ...harvestAndStakeMessage,
    //   first: 'Harvesting your rewards and staking.',
    //   second: 'This could take a while',
    // });
    // await state.manager
    //   .getRewards(ethers.utils.parseUnits(state.minimumHarvestAmount, 18))
    //   .then(async vals => {
    //     let i = 0;
    //     while (i < vals.length) {
    //       await vals[i].getReward.wait();
    //       i++;
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // setState(prevState => ({ ...prevState, minimumHarvestAmount: '0' }));
    // stake();
  }

  return (
    <>
      <Panel>
        <div className="panel-text">
          <p>
            Harvest my pools with at least
            <input
              type="number"
              onChange={(event) => {
                const { value } = event.target
                setState((prevState) => ({
                  ...prevState,
                  minimumHarvestAmount: value,
                }))
              }}
              placeholder="min"
              value={state.minimumHarvestAmount}
              step="any"
            />
            FARM
          </p>
          {state.minimumHarvestAmount === '0' ? (
            ''
          ) : (
            <button
              className="button clear"
              onClick={() =>
                setState((prevState) => ({
                  ...prevState,
                  minimumHarvestAmount: '0',
                }))
              }
              type="button"
            >
              clear
            </button>
          )}
        </div>

        <ButtonContainer>
          {/* {isHarvesting ? //TODO fix ( */}
          {/* eslint-disable-next-line no-constant-condition */}
          {true ? (
            <HarvestingButton>harvest</HarvestingButton>
          ) : (
            <button className="buttons" onClick={harvest} type="button">
              harvest
            </button>
          )}
          {/* {isHarvesting ? //TODO fix ( */}
          {/* eslint-disable-next-line no-constant-condition */}
          {true ? (
            <HarvestingButton>harvest and stake</HarvestingButton>
          ) : (
            <button
              className="buttons harvest-and-stake"
              onClick={harvestAllAndStake}
              type="button"
            >
              harvest and stake
            </button>
          )}
        </ButtonContainer>
      </Panel>
    </>
  )
}

export default Harvest

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

  input[type='number'] {
    -moz-appearance: textfield;
    background-color: ${(props) => props.theme.style.lightBackground};
    border: 0.2rem solid #363636;
    font-size: 1.4rem;
    margin: 0 1rem;
    color: ${(props) => props.theme.style.primaryFontColor};
    width: 12rem;
    text-align: center;
    border-radius: 0.5rem;
    padding: 0.3rem 0.7rem;
    @media (max-width: 1400px) {
      width: 6rem;
    }
    @media (max-width: 1280px) {
      width: 5rem;
    }
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
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
      padding: 0.3rem 1rem;
      font-family: ${fonts.headerFont};
    }
    @media (max-width: 1340px) {
      font-size: 1.6rem;
    }
  }
`

const ButtonContainer = styled.div`
  width: 80%;
  margin: 1.5rem auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .buttons {
    margin-left: 6rem;
    width: max-content;
    font-size: 2rem;
    font-family: ${fonts.headerFont};
    color: ${(props) => props.theme.style.buttonFontColor};
    position: relative;
    margin-top: 4px;
    background: ${(props) => props.theme.style.highlight};
    border: ${(props) => props.theme.style.smallBorder};
    box-shadow: ${(props) => props.theme.style.buttonBoxShadow};
    border-radius: 0.8rem;
    padding: 0.5rem 1rem;
    cursor: pointer;

    &:hover {
      top: 1.5px;
    }
    &.harvest-and-stake {
      margin-left: 5%;
    }
    .button.clear {
      margin-left: 1rem;
    }
  }
`

const HarvestingButton = styled.button`
  margin-left: 6rem;
  width: max-content;
  font-size: 2rem;
  font-family: ${fonts.headerFont};
  position: relative;
  margin-top: 4px;
  background-color: ${(props) => props.theme.style.blueBackground};
  border: ${(props) => props.theme.style.smallBorder};
  box-shadow: ${(props) => props.theme.style.buttonBoxShadow};
  border-radius: 0.8rem;
  padding: 0.5rem 1rem;
  cursor: none;
  color: ${(props) => props.theme.style.buttonFontColor};
  overflow: hidden;
  z-index: 300;
  &::before {
    content: '';
    position: relative;
    left: -50px;
    top: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      to right,
      transparent 10%,
      ${(props) => props.theme.style.blueBackground} 50%,
      transparent 100%
    );
    animation: waiting 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  &:hover {
    top: none;
  }
  @keyframes waiting {
    from {
      left: -100%;
    }
    to {
      left: 100%;
    }
  }
`
