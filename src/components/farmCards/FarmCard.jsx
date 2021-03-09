import React, { useContext } from 'react';
import HarvestContext from '../../Context/HarvestContext';

import { FarmCardContainer, UnderlyingBalanceContainer } from './FarmCardStyles';
import logo from '../../assets/logo.png';

export default function FarmCard({ summaryInformation }) {
  const { prettyBalance, currentExchangeRate, convertStandardNumber } = useContext(HarvestContext);
  const isProfitShareCard = summaryInformation.name === 'FARM Profit Sharing';

  return (
    <FarmCardContainer>
      <div className="farm_card_title">{summaryInformation.name}</div>
      <div className="farm_card_content">
        <div className="card_property_section farm_earning">
          <label className="card_property_title" htmlFor="isActiveMark">
            Earning
            {/* TODO: Add icon here */}
            <p className="card_property_value" id="isActiveMark">
              {summaryInformation.isActive ? (
                <span role="img" aria-label="green checkmark">
                  ✅
                </span>
              ) : (
                <span role="img" aria-label="red x">
                  ❌
                </span>
              )}
            </p>
          </label>
        </div>

        <div className="card_property_section farm_staked">
          <label className="card_property_title" htmlFor="stakedBalance">
            Staked
            <p className="card_property_value" id="stakedBalance">
              {parseFloat(summaryInformation.stakedBalance).toFixed(6)}
            </p>
          </label>
        </div>

        <div className="card_property_section farm_claimable">
          <label className="card_property_title" htmlFor="earnedRewards">
            Claimable
            <p className="card_property_value" id="earnedRewards">
              {(
                Math.floor(parseFloat(summaryInformation.earnedRewards) * 1000000) / 1000000
              ).toFixed(6)}
            </p>
          </label>
        </div>

        <div className="card_property_section farm_unstaked">
          <label className="card_property_title" htmlFor="unstakedBalance">
            Unstaked
            <p className="card_property_value" id="unstakedBalance">
              {Math.floor(parseFloat(summaryInformation.unstakedBalance)).toFixed(6)}
            </p>
          </label>
        </div>

        <div className="card_property_section farm_pool_percentage">
          <label className="card_property_title" htmlFor="percentOfPool">
            % of Pool
            <p className="card_property_value" id="percentOfPool">
              {summaryInformation.percentOfPool}
            </p>
          </label>
        </div>

        <div className="card_property_section farm_value">
          <label className="card_property_title" htmlFor="useValue">
            Value
            <p className="card_property_value" id="useValue">
              {prettyBalance(summaryInformation.usdValueOf * currentExchangeRate)}
            </p>
          </label>
        </div>
      </div>
      <UnderlyingBalanceContainer>
        <div className="underlying_balance_label">
          <h4>Underlying Balance:</h4>
        </div>
        <span className="underlying_balance_value">
          {isProfitShareCard ? (
            <div className="farm_underlying">
              N/A
              <img src={logo} alt="Farm tractor" />
            </div>
          ) : (
            <span>
              {parseFloat(summaryInformation.underlyingBalance).toFixed(6)}
              <div className="underlying_profits">
                (+
                {convertStandardNumber(
                  parseFloat(summaryInformation.profits).toFixed(6) * currentExchangeRate,
                )}{' '}
                📈)
              </div>
            </span>
          )}
        </span>
      </UnderlyingBalanceContainer>
    </FarmCardContainer>
  );
}
