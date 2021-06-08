import { API } from './Api'

const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

describe('API', () => {
  describe('getEthereumPools', () => {
    test('positive scenario', () => {
      return API.getEthereumPools()
        .then((response) => {
          expect(response.length > 0).toBe(true)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
          expect(true).toBe(false)
        })
    })
  })
  describe('getEthereumVaults', () => {
    test('positive scenario', () => {
      return API.getEthereumVaults()
        .then((response) => {
          expect(response.length > 0).toBe(true)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
          expect(true).toBe(false)
        })
    })
  })

  describe('getBSCPools', () => {
    test('positive scenario', () => {
      return API.getBSCPools()
        .then((response) => {
          expect(response.length > 0).toBe(true)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
          expect(true).toBe(false)
        })
    })
  })
  describe('getBSCVaults', () => {
    test('positive scenario', () => {
      return API.getBSCVaults()
        .then((response) => {
          expect(response.length > 0).toBe(true)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
          expect(true).toBe(false)
        })
    })
  })
})
