import React, { useContext, useState } from "react";
import HarvestContext from '../../Context/HarvestContext';
import ethers from 'ethers';

import { FarmCardContainer, UnderlyingBalanceContainer, CardInputContainer } from "./FarmCardStyles";
import logo from '../../assets/logo.png'
export default function FarmCard({ summary_information }) {
  const { state, prettyBalance, currentExchangeRate, isCheckingBalance, harvestAndStakeMessage, setHarvestAndStakeMessage, convertStandardNumber } = useContext(HarvestContext)
  const [amount, setAmount] = useState(summary_information.unstakedBalance);
  const [isStaking, setStaking] = useState(false);
  const [isWithdrawing, setWithdrawing] = useState(false);
  const isProfitShareCard = summary_information.name === "FARM Profit Sharing";

  const pool = () => {
    if (!isCheckingBalance) {
      return state.manager.pools.find((pool) => {
        return pool.address === summary_information.address;
      });
    }
  };

  const formatBalance = (balance) => {
    const bal = parseFloat(balance);
    if (bal === 0) return bal.toString();
    if (bal < 10) return bal.toFixed(6).toString();
    if (bal < 100) return bal.toFixed(5).toString();
    if (bal < 1000) return bal.toFixed(4).toString();
    if (bal < 10_000) return bal.toFixed(3).toString();
    if (bal < 100_000) return (bal / 1000).toFixed(5).toString() + "k";
    if (bal < 1_000_000) return (bal / 1000).toFixed(4).toString() + "k";
    if (bal < 10_000_000) return (bal / 1000).toFixed(3).toString() + "k";
    if (bal < 100_000_000) return (bal / 1_000_000).toFixed(5).toString() + "m";
    if (bal < 1_000_000_000) return (bal / 1_000_000).toFixed(4).toString() + "m";
    if (bal < 10_000_000_000) return (bal / 1_000_000).toFixed(3).toString() + "m";
    return Math.round(bal).toString();
  };

  const stake = async () => {
    const doStake = async (stakeAmount) => {
      await pool
        .stake(stakeAmount)
        .then(async (res) => {
          setHarvestAndStakeMessage({
            ...harvestAndStakeMessage,
            first: `Staking your ${summary_information.name} tokens`,
            second: "",
          });
          await res.wait().then(() => {
            setStaking(false);
            setAmount(0);
            setHarvestAndStakeMessage({
              ...harvestAndStakeMessage,
              first: `Success!`,
              second: `${amount} tokens has been staked on ${summary_information.name} pool!`,
            });
            const timer = setTimeout(() => {
              setHarvestAndStakeMessage({
                ...harvestAndStakeMessage,
                first: ``,
                second: "",
              });
            }, 3000);
            return () => clearTimeout(timer);
          });
        })
        .catch((e) => {
          setStaking(false);
          if (e.code !== 4001 || e.code !== -32603) {
            setHarvestAndStakeMessage({
              ...harvestAndStakeMessage,
              first: ``,
              second: "",
            });
            console.log(
              `You don't have enough ${amount} token to stake on ${summary_information.name} pool`,
            );
          }
        });
    };
    setStaking(true);
    const allowance = await pool.lptoken.allowance(
      state.address,
      pool.address,
    );
    const stakeAmount = ethers.utils.parseUnits(amount.toString(), 18);
    if (allowance.lt(stakeAmount))
      await pool.lptoken.approve(pool.address, ethers.constants.MaxUint256).then(async (res) => {
        await doStake(stakeAmount);
      }).catch(err => {
        console.error(err);
        setStaking(false);
      });
    else {
      await doStake(stakeAmount);
    }
  };

  const withDraw = async () => {
    const doWithdraw = async (withdrawAmount) => {
      await pool
        .withdraw(withdrawAmount)
        .then(async (res) => {
          setHarvestAndStakeMessage({
            ...harvestAndStakeMessage,
            first: `Withdrawing your ${summary_information.name} tokens`,
            second: "",
          });
          await res.wait().then(() => {
            setWithdrawing(false);
            setAmount(0);
            setHarvestAndStakeMessage({
              ...harvestAndStakeMessage,
              first: `Success!`,
              second: `${amount} tokens has been withdrawn on ${summary_information.name} pool!`,
            });
            const timer = setTimeout(() => {
              setHarvestAndStakeMessage({
                ...harvestAndStakeMessage,
                first: ``,
                second: "",
              });
            }, 3000);
            return () => clearTimeout(timer);
          });
        })
        .catch((e) => {
          setWithdrawing(false);
          if (e.code !== 4001 || e.code !== -32603) {
            setHarvestAndStakeMessage({
              ...harvestAndStakeMessage,
              first: ``,
              second: "",
            });
            console.log(
              `You do not have enough ${amount} tokens to withdraw on ${summary_information.name} pool`,
            );
          }
        });
    };
    setWithdrawing(true);
    const withdrawAmount = ethers.utils.parseUnits(amount.toString(), 18);
    await doWithdraw(withdrawAmount);
  };

  return (
    <FarmCardContainer>
      <div className="farm_card_title">{summary_information.name}</div>
      <div className="farm_card_content">
        <div className="card_property_section farm_earning">
          <label className="card_property_title">Earning</label>
          {/* TODO: Add icon here */}
          <p className="card_property_value">{summary_information.isActive ? <span role="img" aria-label="green checkmark">✅</span> : <span role="img" aria-label="red x">❌</span>}</p>
        </div>
        <div className="card_property_section farm_staked">
          <label className="card_property_title">Staked</label>
          <p className="card_property_value">{formatBalance(summary_information.stakedBalance)}</p>
        </div>
        <div className="card_property_section farm_claimable">
          <label className="card_property_title">Claimable</label>
          <p className="card_property_value">{(Math.floor(parseFloat(summary_information.earnedRewards) * 1000000) / 1000000).toFixed(6)}</p>
        </div>
        <div className="card_property_section farm_unstaked">
          <label className="card_property_title">Unstaked</label>
          <p className="card_property_value">{formatBalance(summary_information.unstakedBalance)}</p>
        </div>
        <div className="card_property_section farm_pool_percentage">
          <label className="card_property_title">% of Pool</label>
          <p className="card_property_value">{summary_information.percentOfPool}</p>
        </div>
        <div className="card_property_section farm_value">
          <label className="card_property_title">Value</label>
          <p className="card_property_value">{prettyBalance(summary_information.usdValueOf * currentExchangeRate)}</p>
        </div>

      </div>
      <UnderlyingBalanceContainer>
        <div className="underlying_balance_label">
          <h4>Underlying Balance:</h4>
        </div>
        <span className="underlying_balance_value">{
          isProfitShareCard
            ? <div className="farm_underlying">
              N/A
              <img src={logo} alt="Farm tractor"/>
            </div>
            : <span>
              {formatBalance(summary_information.underlyingBalance)}
              <div className="underlying_profits">
                (+{convertStandardNumber(parseFloat(summary_information.profits).toFixed(6) * currentExchangeRate)} 📈)
                            </div>
            </span>}
        </span>
      </UnderlyingBalanceContainer>
      
        <div className="card_input_area">
          {!isCheckingBalance &&
            (<CardInputContainer>
              <input value={amount} onChange={(e) => { setAmount(e.target.value) }} placeholder="Amount" type="number" min="1" className="card_amount_input" />
              <button className="button" onClick={() => stake()} disabled={parseFloat(amount) && !isStaking ? false : true}>Stake</button>
              <button className="button" onClick={() => withDraw()} disabled={parseFloat(amount) && !isWithdrawing ? false : true}>Withdraw</button>
            </CardInputContainer>)
          }
        </div>
      
    </FarmCardContainer >
  )
}
