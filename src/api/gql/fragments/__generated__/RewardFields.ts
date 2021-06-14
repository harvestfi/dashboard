/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RewardFields
// ====================================================

export interface RewardFields_transaction {
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

export interface RewardFields_token {
  __typename: 'Token'
  /**
   * token address
   */
  id: string
  name: string
  symbol: string
  decimals: number
}

export interface RewardFields {
  __typename: 'Reward'
  /**
   * transactionhash-pooladdress-rewardtoken
   */
  id: string
  timestamp: any
  transaction: RewardFields_transaction
  /**
   * token that is rewarded
   */
  token: RewardFields_token
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
