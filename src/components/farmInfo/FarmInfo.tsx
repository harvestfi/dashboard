import React, { useContext, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'

import { HarvestContext } from '../../Context/HarvestContext'
import Container from './FarmInfoStyles'
import { BluePanel } from '../bluePanel/BluePanel'
import { LoadingBluePanel } from '../bluePanel/components/loadingBluePanel/LoadingBluePanel.styles'
import { IAssetsInfo } from '../../types'
import { prettyCurrency, convertStandardNumber } from '../../utils/utils'
import { API } from '@/api'
import { farmAddress } from '@/constants/constants'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'

interface IProps {
  assets: IAssetsInfo[]
  savedGas: number
}

export const FarmInfo: React.FC<IProps> = observer(({ assets, savedGas }) => {
  const { displayFarmInfo } = useContext(HarvestContext)

  const {
    userAssetsStore,
    farmPriceStore,
    settingsStore,
    apyStore,
  } = useStores()

  const stakedBalance = userAssetsStore.stakedBalance
  const farmPriceValue = farmPriceStore.getValue()
  const baseCurrency = settingsStore.settings.currency.value
  const apy = apyStore.value

  const cellsData = [
    {
      value: prettyCurrency(stakedBalance.toNumber(), baseCurrency),
      text: 'Staked Balance',
    },
    { value: `${state.apy}%`, text: 'Profit Share APY' },
    { value: farmPriceValue, text: 'FARM price' },
    {
      value: prettyCurrency(savedGas, baseCurrency),
      text: 'Personal Saved Gas',
    },
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
})
