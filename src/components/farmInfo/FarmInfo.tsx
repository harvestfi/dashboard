import React, { useContext, useEffect } from 'react'

import { HarvestContext } from '../../Context/HarvestContext'
import Container from './FarmInfoStyles'
import { BluePanel } from '../bluePanel/BluePanel'
import { LoadingBluePanel } from '../bluePanel/components/loadingBluePanel/LoadingBluePanel.styles'
import { IAssetsInfo } from '../../types'
import { prettyBalance, convertStandardNumber } from '../../utils/utils'
import { API } from '@/api'
import { farmAddress, farmDecimals } from '@/constants/constants'

interface IProps {
  assets: IAssetsInfo[]
  savedGas: number
}

export const FarmInfo: React.FC<IProps> = ({ assets, savedGas }) => {
  const {
    state,
    currentExchangeRate,
    displayFarmInfo,
    baseCurrency,
    setState,
  } = useContext(HarvestContext)

  useEffect(() => {
    const getFarmPrice = async () => {
      const farmPrice = await API.getPrice(farmAddress, state.provider)
      setState((prevState) => ({ ...prevState, farmPrice }))
    }

    if (state.provider) {
      getFarmPrice()
    }
  }, [state.provider])

  const farmPriceValue = convertStandardNumber(
    state.farmPrice * currentExchangeRate,
    baseCurrency,
  )

  const pretySavedGas = new Intl.NumberFormat('en').format(Math.round(savedGas))

  const stakedBalance = assets.reduce((acc, currentAsset) => {
    return acc + currentAsset.value
  }, 0)

  const cellsData = [
    {
      value: prettyBalance(stakedBalance, baseCurrency),
      text: 'Staked Balance',
    },
    { value: `${state.apy}%`, text: 'Profit Share APY' },
    { value: farmPriceValue, text: 'FARM price' },
    { value: pretySavedGas, text: 'Personal Saved Gas' },
    // TODO: fix 'farm earned'
    // { value: state.totalFarmEarned?.toFixed(6), text: 'Farm Earned' },
    { value: '-', text: 'Farm Earned' },
  ]

  const Cells = cellsData.map((item) => {
    return displayFarmInfo ? (
      <BluePanel key={item.text} value={item.value} text={item.text} />
    ) : (
      <LoadingBluePanel key={item.text} />
    )
  })

  return <Container>{Cells}</Container>
}
