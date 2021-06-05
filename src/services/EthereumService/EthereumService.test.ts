import { ethWeb3 } from '@/constants'
import { EthereumService } from './EthereumService'
import BigNumber from 'bignumber.js'
import { REWARDS_ABI } from '@/lib/data/ABIs'
import { testValues, testPoolWithVault, testRelatedVault } from './testData'

describe('EthereumService', () => {
  describe('getPrice', () => {
    test('if tokenAddress is valid, then result is valid', () => {
      const validTokenAddress = '0xa0246c9032bc3a600820415ae600c6388619a14d'

      return EthereumService.getPrice(validTokenAddress).then(
        (price: BigNumber | null) => {
          expect(price?.constructor.name).toBe('BigNumber')
        },
      )
    }, 15000)
  })

  describe('getEarned', () => {
    test('If pool has earned method having 1 arguments, then getEarned runs without error', () => {
      const testWallet = '0x814055779f8d2f591277b76c724b7adc74fb82d9'
      const poolAddress = '0xb2b4054f50d5feba40af7759f4619f6b68a95520'
      const poolContract = new ethWeb3.eth.Contract(REWARDS_ABI, poolAddress)

      return EthereumService.getEarned(
        testWallet,
        poolContract,
        ethWeb3,
        poolAddress,
      ).then((reward) => {
        expect(reward).toBe('0')
      })
    }, 10000)

    test('If pool has earned method having 2 arguments, then getEarned runs without error', () => {
      const testWallet = '0x814055779f8d2f591277b76c724b7adc74fb82d9'
      const poolAddress = '0x59a87ab7407371b933cad65001400342519a79bb'
      const poolContract = new ethWeb3.eth.Contract(REWARDS_ABI, poolAddress)

      return EthereumService.getEarned(
        testWallet,
        poolContract,
        ethWeb3,
        poolAddress,
      ).then((reward) => {
        expect(reward).toBe('0')
      })
    }, 10000)
  })
  describe('getAssetsFromPool', () => {
    test('positive scenario', () => {
      const testWallet = '0x814055779f8d2f591277b76c724b7adc74fb82d9'
      const farmPrice = new BigNumber(111)
      return EthereumService.getAssetsFromPool(
        testPoolWithVault,
        testWallet,
        farmPrice,
        testRelatedVault,
      ).then((assetsInfo) => {
        const isTrue =
          assetsInfo.name === 'UNI_DAI_BSG_#V1' &&
          assetsInfo.earnFarm === true &&
          assetsInfo.stakedBalance?.toString().substring(0, 6) === '1.1446' &&
          assetsInfo.percentOfPool?.constructor.name === 'BigNumber' &&
          assetsInfo.value?.constructor.name === 'BigNumber' &&
          assetsInfo.address.vault?.toLocaleLowerCase() ===
            '0x639d4f3f41daa5f4b94d63c2a5f3e18139ba9e54'.toLocaleLowerCase() &&
          assetsInfo.underlyingBalance?.toString().substring(0, 6) ===
            '1.1446' &&
          assetsInfo.unstakedBalance?.toString() === '0' &&
          assetsInfo.farmToClaim?.constructor.name === 'BigNumber'

        expect(isTrue).toBe(true)
      })
    }, 10000)
  })

  describe('getAssets', () => {
    test('number of testWallet assets equal 76', () => {
      const testWallet = '0x814055779f8d2f591277b76c724b7adc74fb82d9'
      return EthereumService.getAssets(testWallet).then((assets) => {
        expect(assets.length).toBe(76)
      })
    }, 40000)

    test('obtained testWallet asset values are valid', () => {
      const testWallet = '0x814055779f8d2f591277b76c724b7adc74fb82d9'
      return EthereumService.getAssets(testWallet).then((assets) => {
        let isUndefined = null
        isUndefined = assets.find((element) => {
          const address = element.address.pool ?? element.address.vault
          const assetFromMock = testValues[address]
          let isValid: boolean = false

          // '0x3da9d911301f8144bdf5c3c67886e5373dcdff8e': {
          //   name: 'V_WETH_#V1',
          //   stakedBalance: '0.249868245624060298',
          //   unstakedBalance: '0',
          //   earnFarm: true,
          //   farmToClaim: 0.07974962073325331,
          // },
          try {
            isValid =
              false &&
              element.earnFarm === assetFromMock.earnFarm &&
              element.farmToClaim?.toNumber() >= assetFromMock.farmToClaim &&
              element.name === assetFromMock.name &&
              element.stakedBalance?.toString() ===
                assetFromMock.stakedBalance &&
              element.unstakedBalance?.toString() ===
                assetFromMock.unstakedBalance &&
              element.percentOfPool?.constructor.name === 'BigNumber' &&
              element.underlyingBalance?.constructor.name === 'BigNumber' &&
              element.value?.constructor.name === 'BigNumber'
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(
              `Test name: obtained testWallet asset values are valid. Some error with ${
                element.address.pool ?? element.address.vault
              }. ${error}`,
            )
            return true
          }
          if (!isValid) {
            // eslint-disable-next-line no-console
            console.log(
              `Test name: obtained testWallet asset values are valid. Some problem with ${{
                element,
                assetFromMock,
              }}.`,
            )
            return true
          }
          return false
        })
        expect(isUndefined).toBe(true)
      })
    }, 40000)
  })
})
