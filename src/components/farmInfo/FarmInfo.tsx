import React, { useContext } from 'react';

import HarvestContext from '../../Context/HarvestContext';
import Container from './FarmInfoStyles';
import BluePanel from '../bluePanel/BluePanel';
import LoadingBluePanel from '../bluePanel/components/loadingBluePanel/LoadingBluePanel.styles';
import { IAssetsInfo } from '../../types';
import { prettyBalance, convertStandardNumber } from '../../utils/utils';

interface IProps {
	assets: IAssetsInfo[];
}

const FarmInfo: React.FC<IProps> = ({ assets }) => {
	const { state, currentExchangeRate, displayFarmInfo, baseCurrency } = useContext(HarvestContext);

	const farmPriceValue = convertStandardNumber(state.farmPrice * currentExchangeRate, baseCurrency);

	// const pretySavedGas = new Intl.NumberFormat('en').format(savedGas);

	const stakedBalance = assets.reduce((acc, currentAsset) => {
		return acc + currentAsset.value;
	}, 0);

	const cellsData = [
		{ value: prettyBalance(stakedBalance, baseCurrency), text: 'Staked Balance' },
		{ value: state.apy, text: 'Profit Share APY' },
		{ value: farmPriceValue, text: 'FARM price' },
		{ value: '-', text: 'Personal Saved Gas' },
		{ value: state.totalFarmEarned?.toFixed(6), text: 'Farm Earned' },
	];

	const Cells = cellsData.map(item => {
		return displayFarmInfo ? (
			<BluePanel key={item.text} value={item.value} text={item.text} />
		) : (
			<LoadingBluePanel key={item.text} />
		);
	});

	return <Container>{Cells}</Container>;
};

export default FarmInfo;
