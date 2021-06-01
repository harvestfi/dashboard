import BigNumber from 'bignumber.js'
import { BSCService } from './BSCService'

describe('BSCService', () => {
  describe('getPriceUsingFactory', () => {
    // TODO find underlying address with default factory and write test
    test('if smart-contract hasn`t Factory, the price is valid ', () => {
      const vaultWithoutFactory = '0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63'

      return BSCService.getPriceUsingFactory(vaultWithoutFactory).then(
        (price) => {
          expect(price?.constructor.name === 'BigNumber').toBe(true)
        },
      )
    })

    test('if factory === LEGACY_BSC_FACTORY, the price is valid ', () => {
      const vaultWithLegacyFactory =
        '0x6b936c5c1fd7de08e03684b0588a87dbd8ce6b63'
      return BSCService.getPriceUsingFactory(vaultWithLegacyFactory).then(
        (price) => {
          expect(price?.constructor.name === 'BigNumber').toBe(true)
        },
      )
    })

    test('if address === undefined, the price is null ', () => {
      const vaultWithLegacyFactory = undefined
      return BSCService.getPriceUsingFactory(vaultWithLegacyFactory).then(
        (price) => {
          expect(price).toBe(null)
        },
      )
    })

    test('if address === undefined, the price is null', () => {
      const vaultWithLegacyFactory = undefined
      return BSCService.getPriceUsingFactory(vaultWithLegacyFactory).then(
        (price) => {
          expect(price).toBe(null)
        },
      )
    })

    test('if address is not valid, the price is null', () => {
      const vaultWithLegacyFactory = 'asdf3r34fsdf'
      return BSCService.getPriceUsingFactory(vaultWithLegacyFactory).then(
        (price) => {
          expect(price).toBe(null)
        },
      )
    })
  })
  describe('getAssetsFromPool', () => {
    test('positive scenario', () => {
      const poolWithVault = {
        id: 2,
        contract: {
          id: 51,
          address: '0xc6f39cff6797bac5e29275177b6e8e315cf87d95',
          name: 'ST_BTCB',
          created: 5992730,
          updated: 6333766,
          type: 1,
          network: 'bsc',
          underlying: null,
        },
        updatedBlock: 5992730,
        controller: {
          id: 2,
          address: '0x222412af183bceadefd72e4cb1b71f1889953b1c',
          name: 'CONTROLLER',
          created: 0,
          updated: null,
          type: 3,
          network: 'bsc',
          underlying: null,
        },
        governance: {
          id: 3,
          address: '0xf00dd244228f51547f0563e60bca65a30fbf5f7f',
          name: 'GOVERNANCE',
          created: 0,
          updated: null,
          type: 3,
          network: 'bsc',
          underlying: null,
        },
        owner: {
          id: 3,
          address: '0xf00dd244228f51547f0563e60bca65a30fbf5f7f',
          name: 'GOVERNANCE',
          created: 0,
          updated: null,
          type: 3,
          network: 'bsc',
          underlying: null,
        },
        lpToken: {
          id: 10,
          address: '0xd75ffa16ffbcf4078d55ff246cfba79bb8ce3f63',
          name: 'BTCB',
          created: 5992229,
          updated: 6929609,
          type: 0,
          network: 'bsc',
          underlying: null,
        },
        rewardToken: {
          id: 50,
          address: '0x4b5c23cac08a567ecf0c1ffca8372a45a5d33743',
          name: 'FARM',
          created: 5992726,
          updated: 7574942,
          type: 4,
          network: 'bsc',
          underlying: null,
        },
      }
      const relatedVault = {
        id: 3,
        contract: {
          id: 10,
          address: '0xd75ffa16ffbcf4078d55ff246cfba79bb8ce3f63',
          name: 'BTCB',
          created: 5992229,
          updated: 6929609,
          type: 0,
          network: 'bsc',
          underlying: null,
        },
        updatedBlock: 5992229,
        controller: {
          id: 2,
          address: '0x222412af183bceadefd72e4cb1b71f1889953b1c',
          name: 'CONTROLLER',
          created: 0,
          updated: null,
          type: 3,
          network: 'bsc',
          underlying: null,
        },
        governance: {
          id: 3,
          address: '0xf00dd244228f51547f0563e60bca65a30fbf5f7f',
          name: 'GOVERNANCE',
          created: 0,
          updated: null,
          type: 3,
          network: 'bsc',
          underlying: null,
        },
        strategy: null,
        underlying: {
          id: 11,
          address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
          name: 'BTCB',
          created: 5992229,
          updated: 6929609,
          type: 4,
          network: 'bsc',
          underlying: null,
        },
        name: 'bFARM_BTCB',
        symbol: 'bfBTCB',
        decimals: 18,
        underlyingUnit: 1000000000000000000,
      }

      const testWalletAddressFoBSC =
        '0xecf0545684a06a4ea7b9c2fb1b6c08f50436e9db'
      const bFarmPrice = new BigNumber(111)

      return BSCService.getAssetsFromPool(
        poolWithVault,
        testWalletAddressFoBSC,
        bFarmPrice,
        relatedVault,
      ).then((assetsInfo) => {
        const isTrue =
          assetsInfo.name === 'BTCB' &&
          assetsInfo.earnFarm === true &&
          assetsInfo.stakedBalance?.toString().substring(0, 7) === '0.00058' &&
          assetsInfo.percentOfPool?.constructor.name === 'BigNumber' &&
          assetsInfo.value?.constructor.name === 'BigNumber' &&
          assetsInfo.address.vault?.toLocaleLowerCase() ===
            '0xd75ffa16ffbcf4078d55ff246cfba79bb8ce3f63'.toLocaleLowerCase() &&
          assetsInfo.underlyingBalance?.toString().substring(0, 7) ===
            '0.00058' &&
          assetsInfo.unstakedBalance?.toString() === '0' &&
          assetsInfo.farmToClaim?.constructor.name === 'BigNumber'
        expect(isTrue).toBe(true)
      })
    })
    test('if bFarm is null, then Value is null', () => {
      const poolWithVault = {
        id: 2,
        contract: {
          id: 51,
          address: '0xc6f39cff6797bac5e29275177b6e8e315cf87d95',
          name: 'ST_BTCB',
          created: 5992730,
          updated: 6333766,
          type: 1,
          network: 'bsc',
          underlying: null,
        },
        updatedBlock: 5992730,
        controller: {
          id: 2,
          address: '0x222412af183bceadefd72e4cb1b71f1889953b1c',
          name: 'CONTROLLER',
          created: 0,
          updated: null,
          type: 3,
          network: 'bsc',
          underlying: null,
        },
        governance: {
          id: 3,
          address: '0xf00dd244228f51547f0563e60bca65a30fbf5f7f',
          name: 'GOVERNANCE',
          created: 0,
          updated: null,
          type: 3,
          network: 'bsc',
          underlying: null,
        },
        owner: {
          id: 3,
          address: '0xf00dd244228f51547f0563e60bca65a30fbf5f7f',
          name: 'GOVERNANCE',
          created: 0,
          updated: null,
          type: 3,
          network: 'bsc',
          underlying: null,
        },
        lpToken: {
          id: 10,
          address: '0xd75ffa16ffbcf4078d55ff246cfba79bb8ce3f63',
          name: 'BTCB',
          created: 5992229,
          updated: 6929609,
          type: 0,
          network: 'bsc',
          underlying: null,
        },
        rewardToken: {
          id: 50,
          address: '0x4b5c23cac08a567ecf0c1ffca8372a45a5d33743',
          name: 'FARM',
          created: 5992726,
          updated: 7574942,
          type: 4,
          network: 'bsc',
          underlying: null,
        },
      }
      const relatedVault = {
        id: 3,
        contract: {
          id: 10,
          address: '0xd75ffa16ffbcf4078d55ff246cfba79bb8ce3f63',
          name: 'BTCB',
          created: 5992229,
          updated: 6929609,
          type: 0,
          network: 'bsc',
          underlying: null,
        },
        updatedBlock: 5992229,
        controller: {
          id: 2,
          address: '0x222412af183bceadefd72e4cb1b71f1889953b1c',
          name: 'CONTROLLER',
          created: 0,
          updated: null,
          type: 3,
          network: 'bsc',
          underlying: null,
        },
        governance: {
          id: 3,
          address: '0xf00dd244228f51547f0563e60bca65a30fbf5f7f',
          name: 'GOVERNANCE',
          created: 0,
          updated: null,
          type: 3,
          network: 'bsc',
          underlying: null,
        },
        strategy: null,
        underlying: {
          id: 11,
          address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
          name: 'BTCB',
          created: 5992229,
          updated: 6929609,
          type: 4,
          network: 'bsc',
          underlying: null,
        },
        name: 'bFARM_BTCB',
        symbol: 'bfBTCB',
        decimals: 18,
        underlyingUnit: 1000000000000000000,
      }

      const testWalletAddressFoBSC =
        '0xecf0545684a06a4ea7b9c2fb1b6c08f50436e9db'
      const bFarmPrice = null
      return BSCService.getAssetsFromPool(
        poolWithVault,
        testWalletAddressFoBSC,
        bFarmPrice,
        relatedVault,
      ).then((assetsInfo) => {
        const isTrue =
          assetsInfo.name === 'BTCB' &&
          assetsInfo.earnFarm === true &&
          assetsInfo.stakedBalance?.constructor.name === 'BigNumber' &&
          assetsInfo.percentOfPool?.constructor.name === 'BigNumber' &&
          assetsInfo.value === null &&
          assetsInfo.address.vault?.toLocaleLowerCase() ===
            '0xd75ffa16ffbcf4078d55ff246cfba79bb8ce3f63'.toLocaleLowerCase() &&
          assetsInfo.underlyingBalance?.constructor.name === 'BigNumber' &&
          assetsInfo.farmToClaim?.constructor.name === 'BigNumber'

        expect(isTrue).toBe(true)
      })
    })
  })
})
