import React, { useContext } from 'react'
import { HarvestContext } from '../../../Context/HarvestContext'
import { CurrencyContainer } from './CurrencyStyles'

const Currency = () => {
  const {
    exchangeRates,
    baseCurrency,
    setBaseCurrency,
    setCurrentExchangeRate,
  } = useContext(HarvestContext)

  const changeHandler = (e) => {
    setBaseCurrency(e.target.value)
    setCurrentExchangeRate(exchangeRates[e.target.value])
    window.localStorage.setItem('HarvestFinance:currency', e.target.value)
  }
  return (
    <CurrencyContainer>
      <h3>Display currency in:</h3>
      <select
        onChange={changeHandler}
        value={baseCurrency}
        name="currency"
        id="currencies"
      >
        <option value="1">{baseCurrency}</option>

        {exchangeRates
          ? Object.entries(exchangeRates).map(([key, value]) => {
              return (
                <option key={key} value={key}>
                  {key}
                </option>
              )
            })
          : ''}
      </select>
    </CurrencyContainer>
  )
}

export default Currency
