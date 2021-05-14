import React from 'react'
import { CurrencyContainer } from './CurrencyStyles'
import { observer } from 'mobx-react'
import { useStores } from '@/stores/utils'

export const Currency = observer(() => {
  const { settingStore } = useStores()

  const handleChange = (event) => {
    settingStore.change('currency', event.target.value)
  }

  return (
    <CurrencyContainer>
      <h3>Display currency in:</h3>
      <select
        onChange={handleChange}
        value={settingStore.settings.currency.value}
        name="currency"
        id="currencies"
      >
        {settingStore.settings.currency.options.map((option) => {
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
