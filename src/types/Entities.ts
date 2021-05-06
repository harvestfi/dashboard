import BigNumber from 'bignumber.js'

interface IContract {
  id: number
  address: string
  name: string
  created: number
  type: number
  /** TODO: to type */
  network: null | string
}

interface IRewardToken extends IContract {
  address:
    | '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651'
    | '0xa0246c9032bc3a600820415ae600c6388619a14d'
}

export interface IPool {
  id: number
  contract: IContract
  updatedBlock: number
  governance: IContract
  owner: IContract
  lpToken: IContract
  rewardToken: IRewardToken
}

export interface IVault {
  id: number
  contract: IContract
  updatedBlock: number
  governance: IContract
  strategy: IContract
  underlying: IContract
  name: string
  symbol: string
  decimals: number
  underlyingUnit: number
}

export interface IAssetsInfo {
  name: string
  earnFarm: boolean
  farmToClaim: BigNumber
  stakedBalance: BigNumber
  percentOfPool: BigNumber | null
  value: BigNumber | null
  unstakedBalance: BigNumber
  address: string
  underlyingBalance: BigNumber
}
