import React, { useContext, useState } from "react";
import HarvestContext from '../../Context/HarvestContext';
import ethers from 'ethers';

import { FarmCardContainer, UnderlyingBalanceContainer, CardInputContainer } from "./FarmCardStyles";
import logo from '../../assets/logo.png'
export default function FarmCard({ summary_information }) {
  const { prettyBalance, currentExchangeRate, isCheckingBalance, convertStandardNumber } = useContext(HarvestContext)
  const [amount, setAmount] = useState(summary_information.unstakedBalance);
  const isProfitShareCard = summary_information.name === "FARM Profit Sharing";

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
          <p className="card_property_value">{parseFloat(summary_information.stakedBalance).toFixed(6)}</p>
        </div>
        <div className="card_property_section farm_claimable">
          <label className="card_property_title">Claimable</label>
          <p className="card_property_value">{(Math.floor(parseFloat(summary_information.earnedRewards) * 1000000) / 1000000).toFixed(6)}</p>
        </div>
        <div className="card_property_section farm_unstaked">
          <label className="card_property_title">Unstaked</label>
          <p className="card_property_value">{Math.floor(parseFloat(summary_information.unstakedBalance)).toFixed(6)}</p>
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
              {parseFloat(summary_information.underlyingBalance).toFixed(6)}
              <div className="underlying_profits">
                (+{convertStandardNumber(parseFloat(summary_information.profits).toFixed(6) * currentExchangeRate)} 📈)
                            </div>
            </span>}
        </span>
      </UnderlyingBalanceContainer>
    </FarmCardContainer>
  )
}
