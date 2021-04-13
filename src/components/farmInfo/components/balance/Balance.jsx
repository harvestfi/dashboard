import React, { useEffect, useState, useContext } from 'react';
import HarvestContext from '../../../../Context/HarvestContext';
import harvest from '../../../../lib/index';
import LoadingBluePanel from '../loadingBluePanel/LoadingBluePanelStyles';
import BluePanel from '../bluePanel/BluePanel';

const { ethers } = harvest;

const Balance = () => {
  const { state, currentExchangeRate, prettyBalance } = useContext(HarvestContext);

  let userBalance = ethers.BigNumber.from(0);

  for (let i = 0; i < state.summaries.length; i++) {
    userBalance = userBalance.add(state.summaries[i].summary.usdValueOf);
  }

  return state.display ? (
    <BluePanel value={prettyBalance(userBalance * currentExchangeRate)} text="Staked Balance" />
  ) : (
    <LoadingBluePanel />
  );
};

export default Balance;
