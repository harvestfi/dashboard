import React, { useEffect } from 'react'
import Container from './FarmInfoStyles'
import { BluePanel } from '../bluePanel/BluePanel'
import { prettyCurrency } from '../../utils/utils'
import { useStores } from '@/stores/utils'
import { observer } from 'mobx-react'
import { LoadingBluePanel } from '@components/bluePanel/components/loadingBluePanel/LoadingBluePanel.styles'
import BigNumber from 'bignumber.js'

type FarmInfoProps = {
  isLoadingAssets: boolean
  stakedBalance: BigNumber
}

export const FarmInfo: React.FC<FarmInfoProps> = observer((props) => {
  const { stakedBalance, isLoadingAssets } = props

  const {
    farmPriceStore,
    settingsStore,
    exchangeRatesStore,
    savedGasStore,
    apyStore,
  } = useStores()

  const displayCurrency = settingsStore.settings.currency.value

  const currentExchangeRate =
    exchangeRatesStore.exchangeRates.values[displayCurrency]

  const farmPriceValue = farmPriceStore.getValue()
    ? prettyCurrency(
        farmPriceStore.getValue(),
        displayCurrency,
        currentExchangeRate,
      )
    : '-'

  useEffect(() => {
    apyStore.fetch()
  }, [])

  const apy = apyStore.value
  const savedGas = savedGasStore.gasSaved

  const isLoading =
    isLoadingAssets ||
    farmPriceStore.isFetching ||
    savedGasStore.isFetching ||
    apyStore.isFetching

  const displayApy = apy && apy !== '0' ? `${apy}%` : '-'
  const cellsData = [
    {
      value: prettyCurrency(
        stakedBalance.toNumber(),
        displayCurrency,
        currentExchangeRate,
      ),
      text: 'Staked Balance',
    },
    { value: displayApy, text: 'Profit Share APY' },
    { value: farmPriceValue, text: 'FARM price' },
    {
      value: prettyCurrency(savedGas, displayCurrency, currentExchangeRate),
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
