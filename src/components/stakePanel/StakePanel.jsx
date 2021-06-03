import React, { useState } from 'react'
import styled from 'styled-components'
import { ethers } from 'ethers'

import { fonts } from '../../App/styles/appStyles'

// components
import NoFarmModal from './NoFarmModal'

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background-color: ${(props) => props.theme.style.lightBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-family: ${fonts.contentFont};
  padding: 1.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};

  @media (max-width: 1002px) {
    margin-bottom: 1.5rem;
  }

  input[type='number'] {
    margin: 0 0.7rem 0 0.4rem;
  }

  button {
    margin-right: 0.15rem;
  }

  .panel-text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    margin-right: 0.5rem;
    .button {
      margin-left: 1rem;
      margin-top: -0.9rem;
      font-size: 1.5rem;
      padding: 0.2rem 0.7rem;
      font-family: ${fonts.headerFont};
    }
    @media (max-width: 1340px) {
      font-size: 1.6rem;
    }
  }
`

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
    &:hover {
      top: 1.5px;
    }
  }
  @media (max-width: 960px) {
    justify-content: center;
    button {
      font-size: 1.6rem;
    }
  }
  @media (max-width: 680px) {
    button {
      font-size: 1.3rem;
    }
  }
`

const StakePanel = ({ state, openModal }) => {
  const [modal, setModal] = useState({
    open: false,
    message: '',
    noFarm: true,
  })
  const [stakeAmount, setStakeAmount] = useState(0)
  const pool = state.manager.pools.find((pool) => {
    return pool.address === '0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50'
  })
  const inactivePools = state.summaries.filter(
    (sum) => sum.stakedBalance && !sum.isActive,
  )

  const checkForFarm = (amount) => {
    if (amount <= 0) {
      setModal({
        ...modal,
        open: true,
        message: "You don't have any farm to stake!",
      })
    } else {
      setStakeAmount(ethers.utils.formatEther(amount))
    }
  }

  const closeErrorModal = () => {
    setModal(false)
  }

  const stake = async () => {
    if (stakeAmount === 0) {
      setModal({
        ...modal,
        open: true,
        message: 'Please enter an amount to stake!',
        noFarm: false,
      })
    } else {
      const allowance = await pool.lptoken.allowance(
        state.address,
        pool.address,
      )
      const amount =
        stakeAmount > 0
          ? ethers.utils.parseUnits(stakeAmount.toString(), 18)
          : await pool.unstakedBalance(state.address)

      if (allowance.lt(amount)) {
        await pool.lptoken.approve(pool.address, ethers.constants.MaxUint256)
        await pool.stake(amount)
      } else {
        await pool.stake(amount).catch((e) => {
          if (e.code !== 4001 || e.code !== -32603) {
            openModal(
              `You do not have enough to stake ${ethers.utils.formatEther(
                amount,
              )} FARM`,
              'error',
            )
          }
        })
      }
    }
    setStakeAmount((stakeAmount) => 0)
  }

  const setMax = async () => {
    const amount =
      stakeAmount > 0
        ? ethers.utils.parseUnits(stakeAmount.toString(), 18)
        : await pool.unstakedBalance(state.address)

    checkForFarm(amount)
  }

  const exitInactivePools = () => {
    state.manager.exitInactive()
  }

  const clearStakeAmount = () => {
    setStakeAmount((stakeAmount) => 0)
  }

  const stakeChangeHandler = (e) => {
    setStakeAmount(e.target.value)
  }

  return (
    <>
      <Panel>
        <div className="panel-text">
          <p>
            Stake
            <input
              type="number"
              onChange={stakeChangeHandler}
              placeholder="amount"
              value={stakeAmount}
              step="any"
            />
            FARM
          </p>
          {stakeAmount > 0 ? (
            <button
              className="button"
              disabled={!state.provider}
              onClick={clearStakeAmount}
            >
              clear
            </button>
          ) : (
            <button
              className="button"
              disabled={!state.provider}
              onClick={setMax}
            >
              max
            </button>
          )}
        </div>

        <ButtonContainer>
          <button className="button" disabled={!state.provider} onClick={stake}>
            stake
          </button>
          {/* <button
            className="button"
            disabled={!state.provider}
            onClick={unstake}
          >
            unstake
          </button> */}

          {inactivePools.length > 0 && (
            <button
              className="button alert"
              disabled={!state.provider}
              onClick={exitInactivePools}
            >
              exit inactive
            </button>
          )}
        </ButtonContainer>
      </Panel>
      <NoFarmModal
        state={state}
        modal={modal}
        onClose={() => closeErrorModal()}
      />
    </>
  )
}

export default StakePanel
