/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  Block_height,
  PoolType,
  ProfitLogType,
} from './../../../types/globalTypes.d'

// ====================================================
// GraphQL query operation: POOL_QUERY
// ====================================================

export interface POOL_QUERY_pool_transaction {
  __typename: 'Transaction'
  /**
   * transaction hash
   */
  id: string
  timestamp: any
  blockNumber: any
  blockHash: any
  from: any
  to: any | null
  value: any
  gasUsed: any
  gasPrice: any
}

export interface POOL_QUERY_pool_vault_transaction {
  __typename: 'Transaction'
  /**
   * transaction hash
   */
  id: string
  timestamp: any
  blockNumber: any
  blockHash: any
  from: any
  to: any | null
  value: any
  gasUsed: any
  gasPrice: any
}

export interface POOL_QUERY_pool_vault_currStrategy_transaction {
  __typename: 'Transaction'
  /**
   * transaction hash
   */
  id: string
  timestamp: any
  blockNumber: any
  blockHash: any
  from: any
  to: any | null
  value: any
  gasUsed: any
  gasPrice: any
}

export interface POOL_QUERY_pool_vault_currStrategy {
  __typename: 'Strategy'
  /**
   * strategy address
   */
  id: string
  /**
   * timestamp strategy was registered on the vault
   */
  timestamp: any
  /**
   * transaction strategy was registered on the vault
   */
  transaction: POOL_QUERY_pool_vault_currStrategy_transaction
  /**
   * aggregated profit generated by strategy
   */
  aggregatedProfit: any
  /**
   * aggregated fee for profit sharing
   */
  aggregatedFee: any
}

export interface POOL_QUERY_pool_vault_strategies_transaction {
  __typename: 'Transaction'
  /**
   * transaction hash
   */
  id: string
  timestamp: any
  blockNumber: any
  blockHash: any
  from: any
  to: any | null
  value: any
  gasUsed: any
  gasPrice: any
}

export interface POOL_QUERY_pool_vault_strategies {
  __typename: 'Strategy'
  /**
   * strategy address
   */
  id: string
  /**
   * timestamp strategy was registered on the vault
   */
  timestamp: any
  /**
   * transaction strategy was registered on the vault
   */
  transaction: POOL_QUERY_pool_vault_strategies_transaction
  /**
   * aggregated profit generated by strategy
   */
  aggregatedProfit: any
  /**
   * aggregated fee for profit sharing
   */
  aggregatedFee: any
}

export interface POOL_QUERY_pool_vault_underlying {
  __typename: 'Token'
  /**
   * token address
   */
  id: string
  name: string
  symbol: string
  decimals: number
}

export interface POOL_QUERY_pool_vault_fToken {
  __typename: 'Token'
  /**
   * token address
   */
  id: string
  name: string
  symbol: string
  decimals: number
}

export interface POOL_QUERY_pool_vault_currPool {
  __typename: 'Pool'
  /**
   * pool address
   */
  id: string
}

export interface POOL_QUERY_pool_vault_doHardWorks_transaction {
  __typename: 'Transaction'
  /**
   * transaction hash
   */
  id: string
  timestamp: any
  blockNumber: any
  blockHash: any
  from: any
  to: any | null
  value: any
  gasUsed: any
  gasPrice: any
}

export interface POOL_QUERY_pool_vault_doHardWorks_strategy_transaction {
  __typename: 'Transaction'
  /**
   * transaction hash
   */
  id: string
  timestamp: any
  blockNumber: any
  blockHash: any
  from: any
  to: any | null
  value: any
  gasUsed: any
  gasPrice: any
}

export interface POOL_QUERY_pool_vault_doHardWorks_strategy {
  __typename: 'Strategy'
  /**
   * strategy address
   */
  id: string
  /**
   * timestamp strategy was registered on the vault
   */
  timestamp: any
  /**
   * transaction strategy was registered on the vault
   */
  transaction: POOL_QUERY_pool_vault_doHardWorks_strategy_transaction
  /**
   * aggregated profit generated by strategy
   */
  aggregatedProfit: any
  /**
   * aggregated fee for profit sharing
   */
  aggregatedFee: any
}

export interface POOL_QUERY_pool_vault_doHardWorks_sharePriceChangeLog {
  __typename: 'SharePriceChangeLog'
  /**
   * transaction hash
   */
  id: string
  /**
   * share price before do hardwork
   */
  oldSharePrice: any
  /**
   * share price after do hard work
   */
  newSharePrice: any
}

export interface POOL_QUERY_pool_vault_doHardWorks_profitLog {
  __typename: 'ProfitLog'
  /**
   * transaction hash
   */
  id: string
  /**
   * type of profit log event
   */
  type: ProfitLogType
  /**
   * profit amount
   */
  profitAmount: any
  /**
   * fee for profit share
   */
  feeAmount: any
}

export interface POOL_QUERY_pool_vault_doHardWorks {
  __typename: 'DoHardWork'
  /**
   * transaction hash
   */
  id: string
  timestamp: any
  transaction: POOL_QUERY_pool_vault_doHardWorks_transaction
  /**
   * strategy that was used for hardwork
   */
  strategy: POOL_QUERY_pool_vault_doHardWorks_strategy
  /**
   * price per full share after do hard work
   */
  pricePerFullShare: any
  /**
   * balance in vault at time of hard work
   */
  balanceInVault: any
  /**
   * balance in vault including invested portion
   */
  balanceWithInvestment: any
  /**
   * event associated with share price change emitted by controller
   */
  sharePriceChangeLog: POOL_QUERY_pool_vault_doHardWorks_sharePriceChangeLog | null
  /**
   * profit log associated with do hard work - note that it might not exist
   */
  profitLog: POOL_QUERY_pool_vault_doHardWorks_profitLog | null
}

export interface POOL_QUERY_pool_vault_withdrawals_transaction {
  __typename: 'Transaction'
  /**
   * transaction hash
   */
  id: string
  timestamp: any
  blockNumber: any
  blockHash: any
  from: any
  to: any | null
  value: any
  gasUsed: any
  gasPrice: any
}

export interface POOL_QUERY_pool_vault_withdrawals_user {
  __typename: 'User'
  /**
   * address of user account
   */
  id: string
}

export interface POOL_QUERY_pool_vault_withdrawals {
  __typename: 'Withdrawal'
  id: string
  timestamp: any
  transaction: POOL_QUERY_pool_vault_withdrawals_transaction
  user: POOL_QUERY_pool_vault_withdrawals_user
  amount: any
}

export interface POOL_QUERY_pool_vault_deposits_transaction {
  __typename: 'Transaction'
  /**
   * transaction hash
   */
  id: string
  timestamp: any
  blockNumber: any
  blockHash: any
  from: any
  to: any | null
  value: any
  gasUsed: any
  gasPrice: any
}

export interface POOL_QUERY_pool_vault_deposits_user {
  __typename: 'User'
  /**
   * address of user account
   */
  id: string
}

export interface POOL_QUERY_pool_vault_deposits {
  __typename: 'Deposit'
  id: string
  timestamp: any
  transaction: POOL_QUERY_pool_vault_deposits_transaction
  user: POOL_QUERY_pool_vault_deposits_user
  amount: any
}

export interface POOL_QUERY_pool_vault {
  __typename: 'Vault'
  /**
   * address of the vault
   */
  id: string
  /**
   * timestamp vault was registered at the controller
   */
  timestamp: any
  /**
   * transaction vault was registered at the controller
   */
  transaction: POOL_QUERY_pool_vault_transaction
  /**
   * current strategy
   */
  currStrategy: POOL_QUERY_pool_vault_currStrategy
  /**
   * all strategies
   */
  strategies: POOL_QUERY_pool_vault_strategies[]
  /**
   * token locked up in vault
   */
  underlying: POOL_QUERY_pool_vault_underlying
  /**
   * returned share token
   */
  fToken: POOL_QUERY_pool_vault_fToken
  /**
   * most recent pool as detected by NotifyHelper is usually not null
   */
  currPool: POOL_QUERY_pool_vault_currPool | null
  /**
   * hard work done on vault
   */
  doHardWorks: POOL_QUERY_pool_vault_doHardWorks[]
  withdrawals: POOL_QUERY_pool_vault_withdrawals[]
  deposits: POOL_QUERY_pool_vault_deposits[]
}

export interface POOL_QUERY_pool_rewardTokens {
  __typename: 'Token'
  /**
   * token address
   */
  id: string
  name: string
  symbol: string
  decimals: number
}

export interface POOL_QUERY_pool_rewards_transaction {
  __typename: 'Transaction'
  /**
   * transaction hash
   */
  id: string
  timestamp: any
  blockNumber: any
  blockHash: any
  from: any
  to: any | null
  value: any
  gasUsed: any
  gasPrice: any
}

export interface POOL_QUERY_pool_rewards_token {
  __typename: 'Token'
  /**
   * token address
   */
  id: string
  name: string
  symbol: string
  decimals: number
}

export interface POOL_QUERY_pool_rewards {
  __typename: 'Reward'
  /**
   * transactionhash-pooladdress-rewardtoken
   */
  id: string
  timestamp: any
  transaction: POOL_QUERY_pool_rewards_transaction
  /**
   * token that is rewarded
   */
  token: POOL_QUERY_pool_rewards_token
  /**
   * amount of reward added
   */
  reward: any
  /**
   * reward rate after reward was added - valid untill next reward or periodFinish
   */
  rewardRate: any
  /**
   * timestamp when the pool runs out of rewards if no new rewards are added
   */
  periodFinish: any
}

export interface POOL_QUERY_pool {
  __typename: 'Pool'
  /**
   * pool address
   */
  id: string
  /**
   * timestamp pool was first rewarded via notifyhelper
   */
  timestamp: any
  /**
   * transaction pool was first rewarded via notifyhelper
   */
  transaction: POOL_QUERY_pool_transaction
  /**
   * pool type
   */
  type: PoolType
  /**
   * vault can be null in very special cases but generally exists
   */
  vault: POOL_QUERY_pool_vault | null
  rewardTokens: POOL_QUERY_pool_rewardTokens[]
  rewards: POOL_QUERY_pool_rewards[]
}

export interface POOL_QUERY {
  pool: POOL_QUERY_pool | null
}

export interface POOL_QUERYVariables {
  id: string
  blockHeight?: Block_height | null
}
