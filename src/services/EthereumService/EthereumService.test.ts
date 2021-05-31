import { ethWeb3 } from '@/constants'
import { EthereumService } from './EthereumService'
import BigNumber from 'bignumber.js'
import { REWARDS_ABI } from '@/lib/data/ABIs'

describe('EthereumService', () => {
  describe('getPrice', () => {
    test('if tokenAddress is valid, then result is valid', () => {
      const validTokenAddress = '0xa0246c9032bc3a600820415ae600c6388619a14d'

      return EthereumService.getPrice(validTokenAddress).then(
        (price: BigNumber | null) => {
          expect(price?.constructor.name).toBe('BigNumber')
        },
      )
    })
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
    })

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
    })
  })
  describe('getAssetsFromPool', () => {
    test('positive scenario', () => {
      const poolWithVault = {
        id: 138,
        contract: {
          id: 432,
          address: '0xf5b221e1d9c3a094fb6847bc3e241152772bbbf8',
          name: 'ST_UNI_DAI_BSG_#V1',
          created: 11660866,
          updated: 11662009,
          type: 1,
          network: 'eth',
          underlying: null,
        },
        updatedBlock: 11660866,
        controller: {
          id: 146,
          address: '0x222412af183bceadefd72e4cb1b71f1889953b1c',
          name: 'CONTROLLER',
          created: 0,
          updated: null,
          type: 3,
          network: 'eth',
          underlying: null,
        },
        governance: {
          id: 147,
          address: '0xf00dd244228f51547f0563e60bca65a30fbf5f7f',
          name: 'GOVERNANCE',
          created: 0,
          updated: null,
          type: 3,
          network: 'eth',
          underlying: null,
        },
        owner: {
          id: 147,
          address: '0xf00dd244228f51547f0563e60bca65a30fbf5f7f',
          name: 'GOVERNANCE',
          created: 0,
          updated: null,
          type: 3,
          network: 'eth',
          underlying: null,
        },
        lpToken: {
          id: 430,
          address: '0x639d4f3f41daa5f4b94d63c2a5f3e18139ba9e54',
          name: 'UNI_DAI_BSG_#V1',
          created: 11660621,
          updated: null,
          type: 0,
          network: 'eth',
          underlying: null,
        },
        rewardToken: {
          id: 157,
          address: '0xa0246c9032bc3a600820415ae600c6388619a14d',
          name: 'FARM',
          created: 10770203,
          updated: 12093879,
          type: 4,
          network: 'eth',
          underlying: null,
        },
      }
      const relatedVault = {
        id: 99,
        contract: {
          id: 430,
          address: '0x639d4f3f41daa5f4b94d63c2a5f3e18139ba9e54',
          name: 'UNI_DAI_BSG_#V1',
          created: 11660621,
          updated: null,
          type: 0,
          network: 'eth',
          underlying: null,
        },
        updatedBlock: 11660621,
        controller: {
          id: 146,
          address: '0x222412af183bceadefd72e4cb1b71f1889953b1c',
          name: 'CONTROLLER',
          created: 0,
          updated: null,
          type: 3,
          network: 'eth',
          underlying: null,
        },
        governance: {
          id: 147,
          address: '0xf00dd244228f51547f0563e60bca65a30fbf5f7f',
          name: 'GOVERNANCE',
          created: 0,
          updated: null,
          type: 3,
          network: 'eth',
          underlying: null,
        },
        strategy: null,
        underlying: {
          id: 420,
          address: '0x4a9596e5d2f9bef50e4de092ad7181ae3c40353e',
          name: 'UNI_LP_DAI_BSG',
          created: 11655635,
          updated: 11662009,
          type: 2,
          network: 'eth',
          underlying: null,
        },
        name: 'FARM_UNI-V2',
        symbol: 'fUNI-V2',
        decimals: 18,
        underlyingUnit: 1000000000000000000,
      }

      const testWallet = '0x814055779f8d2f591277b76c724b7adc74fb82d9'
      const farmPrice = new BigNumber(111)
      return EthereumService.getAssetsFromPool(
        poolWithVault,
        testWallet,
        farmPrice,
        relatedVault,
      ).then((assetsInfo) => {
        const isTrue =
          assetsInfo.name === 'UNI_DAI_BSG_#V1' &&
          assetsInfo.earnFarm === true &&
          assetsInfo.stakedBalance?.toString().substring(0, 6) === '1.1446' &&
          assetsInfo.percentOfPool?.constructor.name === 'BigNumber' &&
          assetsInfo.value?.constructor.name === 'BigNumber' &&
          assetsInfo.address.vault?.toLocaleLowerCase() ===
            '0x639d4f3f41daa5f4b94d63c2a5f3e18139ba9e54'.toLocaleLowerCase() &&
          assetsInfo.underlyingBalance?.toString().substring(0, 6) === '1.1446'

        expect(isTrue).toBe(true)
      })
    })
  })
})
