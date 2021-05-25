import React from 'react'
import Container from './FarmInfoStyles'
import { BluePanel } from '../bluePanel/BluePanel'
import { prettyCurrency } from '../../utils/utils'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'
import { LoadingBluePanel } from '@components/bluePanel/components/loadingBluePanel/LoadingBluePanel.styles'

type FarmInfoProps = {
  isLoadingAssets: boolean
  stakedBalance: number
}

export const FarmInfo: React.FC<FarmInfoProps> = observer((props) => {
  const { stakedBalance, isLoadingAssets } = props

  const { farmPriceStore, settingsStore, savedGasStore, apyStore } = useStores()

  const farmPriceValue = farmPriceStore.getValue()
  const baseCurrency = settingsStore.settings.currency.value
  const apy = apyStore.value
  const savedGas = savedGasStore.value

  const isLoading =
    isLoadingAssets ||
    farmPriceStore.isFetching ||
    savedGasStore.isFetching ||
    apyStore.isFetching

  const displayApy = apy ? `${apy}%` : 'Error'
  const cellsData = [
    {
      value: prettyCurrency(stakedBalance.toNumber(), baseCurrency),
      text: 'Staked Balance',
    },
    { value: displayApy, text: 'Profit Share APY' },
    { value: farmPriceValue, text: 'FARM price' },
    {
      value: prettyCurrency(savedGas, baseCurrency),
      text: 'Personal Saved Gas',
    },
    { value: '-', text: 'Farm Earned' },
  ]

  const Cells = cellsData.map((item) => {
    return isLoading ? (
      <LoadingBluePanel key={item.text} />
    ) : (
      <BluePanel key={item.text} value={item.value} text={item.text} />
    )
  })

  return <Container>{Cells}</Container>
})
