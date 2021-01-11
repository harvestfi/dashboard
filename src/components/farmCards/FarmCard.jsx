import React from "react";

import { FarmCardContainer, UnderlyingBalanceContainer } from "./FarmCardStyles";

export default function FarmCard({ summary_information }) {

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
                    <p className="card_property_value">{parseFloat(summary_information.unstakedBalance).toFixed(6)}</p>
                </div>
                <div className="card_property_section farm_pool_percentage">
                    <label className="card_property_title">% of Pool</label>
                    <p className="card_property_value">{summary_information.percentOfPool}</p>
                </div>
                <div className="card_property_section farm_value">
                    <label className="card_property_title">Value</label>
                    <p className="card_property_value">{summary_information.usdValueOf}</p>
                </div>

            </div>
            <UnderlyingBalanceContainer>
                <label className="underlying_balance_label">Underlying Balance:</label> <span className="underlying_balance_value">{summary_information.name === "FARM Profit Sharing" ? "N/A" : parseFloat(summary_information.underlyingBalance).toFixed(6)}</span>
            </UnderlyingBalanceContainer>
            <div className="card_input_area">
                {/* TODO: Add reward harvest/stake functions for this to be relevant*/}
                {/* {isCheckingBalance ? (<></>) : 
                (<CardInputContainer>
                    <input value={amount} onChange={(e)=>{setAmount(e.target.value)}} placeholder="Amount" type="number" min="1" className="card_amount_input" />
                    <button className="card_max_button" onClick={() => setAmount(summary_information.earnedRewards)}>max</button>
                </CardInputContainer>)
                } */}
            </div>

            {/* TODO: Add reward harvest/stake functions */}
            {/* {isCheckingBalance ? (<></>) : 
            (<FarmCardButtonsContainer>
                <button onClick={() => harvestRewards(summary_information)} className="farm_card_button">Harvest</button>
                <button className="farm_card_button">Stake</button>
            </FarmCardButtonsContainer>)} */}
        </FarmCardContainer>
    )
}
