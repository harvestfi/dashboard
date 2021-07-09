import BigNumber from 'bignumber.js'

export interface IContract {
  id: number
  address: string
  name: string
  created?: number
  type?: number
  /** TODO: to type */
  network?: null | string
}

interface IVaultAndPoolAddresses {
  vault?: string
  pool?: string
}

interface IRewardToken extends IContract {
  address: string
}

export interface IPool {
  id: number
  contract: IContract
  updatedBlock?: number
  governance?: IContract
  owner?: IContract
  lpToken?: IContract
  rewardToken?: IRewardToken
}

export interface IVault {
  id: number
  contract: IContract
  updatedBlock: number | null
  governance?: IContract
  strategy: IContract | null
  underlying: IContract | null
  name: string
  symbol: string
  decimals?: number
  underlyingUnit?: number
}

export interface IAssetsInfo {
  id: string
  name: string
  prettyName: string
  earnFarm: boolean
  farmToClaim: BigNumber | null
  stakedBalance: BigNumber | null
  percentOfPool: BigNumber | null
  value: BigNumber | null
  unstakedBalance: BigNumber | null
  address: IVaultAndPoolAddresses
  underlyingBalance: BigNumber | null
}
