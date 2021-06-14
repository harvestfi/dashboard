/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Block_height, ProfitLogType } from './../../../types/globalTypes.d'

// ====================================================
// GraphQL query operation: VAULT_QUERY
// ====================================================

export interface VAULT_QUERY_vault_transaction {
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

export interface VAULT_QUERY_vault_currStrategy_transaction {
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

export interface VAULT_QUERY_vault_currStrategy {
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
  transaction: VAULT_QUERY_vault_currStrategy_transaction
  /**
   * aggregated profit generated by strategy
   */
  aggregatedProfit: any
  /**
   * aggregated fee for profit sharing
   */
  aggregatedFee: any
}

export interface VAULT_QUERY_vault_strategies_transaction {
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

export interface VAULT_QUERY_vault_strategies {
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
  transaction: VAULT_QUERY_vault_strategies_transaction
  /**
   * aggregated profit generated by strategy
   */
  aggregatedProfit: any
  /**
   * aggregated fee for profit sharing
   */
  aggregatedFee: any
}

export interface VAULT_QUERY_vault_underlying {
  __typename: 'Token'
  /**
   * token address
   */
  id: string
  name: string
  symbol: string
  decimals: number
}

export interface VAULT_QUERY_vault_fToken {
  __typename: 'Token'
  /**
   * token address
   */
  id: string
  name: string
  symbol: string
  decimals: number
}

export interface VAULT_QUERY_vault_currPool {
  __typename: 'Pool'
  /**
   * pool address
   */
  id: string
}

export interface VAULT_QUERY_vault_doHardWorks_transaction {
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

export interface VAULT_QUERY_vault_doHardWorks_strategy_transaction {
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

export interface VAULT_QUERY_vault_doHardWorks_strategy {
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
  transaction: VAULT_QUERY_vault_doHardWorks_strategy_transaction
  /**
   * aggregated profit generated by strategy
   */
  aggregatedProfit: any
  /**
   * aggregated fee for profit sharing
   */
  aggregatedFee: any
}

export interface VAULT_QUERY_vault_doHardWorks_sharePriceChangeLog {
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

export interface VAULT_QUERY_vault_doHardWorks_profitLog {
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

export interface VAULT_QUERY_vault_doHardWorks {
  __typename: 'DoHardWork'
  /**
   * transaction hash
   */
  id: string
  timestamp: any
  transaction: VAULT_QUERY_vault_doHardWorks_transaction
  /**
   * strategy that was used for hardwork
   */
  strategy: VAULT_QUERY_vault_doHardWorks_strategy
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
  sharePriceChangeLog: VAULT_QUERY_vault_doHardWorks_sharePriceChangeLog | null
  /**
   * profit log associated with do hard work - note that it might not exist
   */
  profitLog: VAULT_QUERY_vault_doHardWorks_profitLog | null
}

export interface VAULT_QUERY_vault_withdrawals_transaction {
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

export interface VAULT_QUERY_vault_withdrawals_user {
  __typename: 'User'
  /**
   * address of user account
   */
  id: string
}

export interface VAULT_QUERY_vault_withdrawals {
  __typename: 'Withdrawal'
  id: string
  timestamp: any
  transaction: VAULT_QUERY_vault_withdrawals_transaction
  user: VAULT_QUERY_vault_withdrawals_user
  amount: any
}

export interface VAULT_QUERY_vault_deposits_transaction {
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

export interface VAULT_QUERY_vault_deposits_user {
  __typename: 'User'
  /**
   * address of user account
   */
  id: string
}

export interface VAULT_QUERY_vault_deposits {
  __typename: 'Deposit'
  id: string
  timestamp: any
  transaction: VAULT_QUERY_vault_deposits_transaction
  user: VAULT_QUERY_vault_deposits_user
  amount: any
}

export interface VAULT_QUERY_vault {
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
  transaction: VAULT_QUERY_vault_transaction
  /**
   * current strategy
   */
  currStrategy: VAULT_QUERY_vault_currStrategy
  /**
   * all strategies
   */
  strategies: VAULT_QUERY_vault_strategies[]
  /**
   * token locked up in vault
   */
  underlying: VAULT_QUERY_vault_underlying
  /**
   * returned share token
   */
  fToken: VAULT_QUERY_vault_fToken
  /**
   * most recent pool as detected by NotifyHelper is usually not null
   */
  currPool: VAULT_QUERY_vault_currPool | null
  /**
   * hard work done on vault
   */
  doHardWorks: VAULT_QUERY_vault_doHardWorks[]
  withdrawals: VAULT_QUERY_vault_withdrawals[]
  deposits: VAULT_QUERY_vault_deposits[]
}

export interface VAULT_QUERY {
  vault: VAULT_QUERY_vault | null
}

export interface VAULT_QUERYVariables {
  id: string
  block?: Block_height | null
}
