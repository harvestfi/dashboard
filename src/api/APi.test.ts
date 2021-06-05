import { API } from './Api'

describe('API', () => {
  describe('getEthereumPools', () => {
    test('positive scenario', () => {
      return API.getEthereumPools2().then((response) => {
        expect(response[0].id).toBe(7)
      })
    })
  })
})
