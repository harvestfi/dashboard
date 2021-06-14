/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: WithdrawalFields
// ====================================================

export interface WithdrawalFields_transaction {
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

export interface WithdrawalFields_user {
  __typename: 'User'
  /**
   * address of user account
   */
  id: string
}

export interface WithdrawalFields {
  __typename: 'Withdrawal'
  id: string
  timestamp: any
  transaction: WithdrawalFields_transaction
  user: WithdrawalFields_user
  amount: any
}
