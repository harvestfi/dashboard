import React, { useContext } from 'react';

import HarvestContext from '../../Context/HarvestContext';
import Balance from './components/balance/Balance';
import Container from './FarmInfoStyles';
import BluePanel from './components/bluePanel/BluePanel';
import LoadingBluePanel from './components/loadingBluePanel/LoadingBluePanelStyles';

const FarmInfo = ({ savedGas }) => {
    const { state, convertStandardNumber, currentExchangeRate } = useContext(HarvestContext);
    const farmPriceValue = convertStandardNumber(state.farmPrice * currentExchangeRate);

    const pretySavedGas = new Intl.NumberFormat('en').format(savedGas);

    const cellsData = [
        { value: state.apy, text: 'Profit Share APY' },
        { value: farmPriceValue, text: 'FARM price' },
        { value: pretySavedGas, text: 'Personal Saved Gas' },
        { value: state.totalFarmEarned?.toFixed(6), text: 'Farm Earned' },
    ];

    const Cells = cellsData.map(item => {
        return state.display ? (
            <BluePanel key={item.text} value={item.value} text={item.text} />
        ) : (
            <LoadingBluePanel key={item.text} />
        );
    });

    return (
        <Container>
            <Balance />
            {Cells}
        </Container>
    );
};

export default FarmInfo;
