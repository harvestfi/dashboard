/** This Set contains addresses of vaults that have no reward  */
import {
  BSC_ORACLE_ABI_FOR_GETTING_PRICES,
  SNOWSWAP_STAKING_POOL_ABI,
} from '@/lib/data/ABIs'
import { IVault } from '@/types'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import path from 'path'
import dotenv from 'dotenv'

// this is needed to define .env-variables during test execution
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

export const vaultsWithoutReward = new Set<string>([])

// FARM decimals
export const farmDecimals = 18

// every price decimals
export const PRICE_DECIMALS = 18

// Ethereum
export const farmAddress = '0xa0246c9032bc3a600820415ae600c6388619a14d'

export const PSAddress = '0x25550cccbd68533fa04bfd3e3ac4d09f9e00fc50'

// BSC
export const bFarmAddress = '0x4b5c23cac08a567ecf0c1ffca8372a45a5d33743'

export const iPSAddress: IVault = {
  id: 0,
  contract: {
    id: 0,
    address: '0x1571eD0bed4D987fe2b498DdBaE7DFA19519F651',
    name: 'iFarm',
    created: 0,
    type: 0,
    network: 'eth',
  },
  governance: {
    id: 0,
    address: '',
    name: '',
    created: 0,
    type: 0,
    network: 'eth',
  },
  strategy: {
    id: 0,
    address: '',
    name: '',
    created: 0,
    type: 0,
    network: 'eth',
  },
  underlying: {
    id: 0,
    address: '0xa0246c9032bc3a600820415ae600c6388619a14d',
    name: 'FARM',
    created: 0,
    type: 4,
    network: 'eth',
  },
  updatedBlock: 0,
  name: 'iFarm',
  symbol: 'iFarm',
  decimals: 18,
  underlyingUnit: 18,
}

export const ethereumOutdatedVaults = new Set<string>([
  '0x59258f4e15a5fc74a7284055a8094f58108dbd4f',
])

export const ethereumOutdatedPools = new Set<string>([])

export const bscOutdatedVaults = new Set<string>([])

export const bscOutdatedPools = new Set<string>([])

export const SNOWSWAP = {
  fSnow: {
    address: '0xfe9a29ab92522d14fc65880d817214261d8479ae',
  },
  fSnowStakingPool: {
    address: '0xe4a692e8f954e1a108cb184bdb18064ca3962801',
    abi: SNOWSWAP_STAKING_POOL_ABI,
  },
}

export const ETHEREUM_CONTRACT_FOR_GETTING_PRICES =
  '0x48dc32eca58106f06b41de514f29780ffa59c279'

export const DEFAULT_BSC_ORACLE_CONTRACT_FOR_GETTING_PRICES =
  '0x643cF46eef91Bd878D9710ceEB6a7E6F929F2608'

export const LEGACY_BSC_ORACLE_CONTRACT_FOR_GETTING_PRICES =
  '0xE0e9F05054Ad3a2b6414AD13D768be91a84b47e8'

export const LEGACY_BSC_FACTORY = '0xbcfccbde45ce874adcb698cc183debcf17952812'

const BSC_URL = 'https://bsc-dataseed.binance.org/'

export const BSCWeb3 = new Web3(BSC_URL)
export const ethWeb3 = new Web3(process.env.REACT_APP_ETH_URL!)

const legacyContractForPrices = new BSCWeb3.eth.Contract(
  BSC_ORACLE_ABI_FOR_GETTING_PRICES,
  LEGACY_BSC_ORACLE_CONTRACT_FOR_GETTING_PRICES,
)

const contractForPricesByDefault = new BSCWeb3.eth.Contract(
  BSC_ORACLE_ABI_FOR_GETTING_PRICES,
  DEFAULT_BSC_ORACLE_CONTRACT_FOR_GETTING_PRICES,
)

export const CONTRACTS_FOR_PRICES = {
  default: contractForPricesByDefault,
  legacy: legacyContractForPrices,
}

export type CONTRACTS_FOR_PRICES_KEYS = keyof typeof CONTRACTS_FOR_PRICES

export const BigNumberZero = new BigNumber(0)

export const BigNumberOne = new BigNumber(1)

export const ethereumPoolsWithEarnedMethodTaking2Arguments = new Set<string>([
  '0x59a87ab7407371b933cad65001400342519a79bb',
  '0xf4ead5142749316c8ca141959b510862fbba1807'.toLocaleLowerCase(),
])

export const BSCContractsWithoutFactoryMethod = new Set<string>([
  '0xecf0545684a06a4ea7b9c2fb1b6c08f50436e9db',
  '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
  '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  '0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63',
])
