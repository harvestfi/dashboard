import React from 'react'
import { CurrencyContainer } from './CurrencyStyles'
import { observer } from 'mobx-react'
import { useStores } from '@/stores/utils'

export const Currency = observer(() => {
  const { settingsStore } = useStores()

  const handleChange = (event) => {
    settingsStore.change('currency', event.target.value)
  }

  return (
    <CurrencyContainer>
      <h3>Display currency in:</h3>
      <select
        onChange={handleChange}
        value={settingsStore.settings.currency.value}
        name="currency"
        id="currencies"
      >
        {settingsStore.settings.currency.options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          )
        })}
      </select>
    </CurrencyContainer>
  )
})
