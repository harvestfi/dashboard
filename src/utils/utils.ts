const currencyFormatter = (currency: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  })

const numberFormatter = () =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 })

export const prettyNumber = (number: number) => {
  return numberFormatter().format(number)
}

export const prettyCurrency = (balance: number, currency: string) => {
  return currencyFormatter(currency).format(balance)
}

export const convertStandardNumber = (num: number, currency: string) => {
  return num ? currencyFormatter(currency).format(num) : '$0.00'
}

export const prettyEthAddress = (address: string) => {
  if (address && address.length === 42) {
    address = `${address.substring(0, 6)}...${address.substring(42, 38)}`
  }
  return address
}
