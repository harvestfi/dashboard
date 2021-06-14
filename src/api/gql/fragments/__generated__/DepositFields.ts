/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DepositFields
// ====================================================

export interface DepositFields_transaction {
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

export interface DepositFields_user {
  __typename: 'User'
  /**
   * address of user account
   */
  id: string
}

export interface DepositFields {
  __typename: 'Deposit'
  id: string
  timestamp: any
  transaction: DepositFields_transaction
  user: DepositFields_user
  amount: any
}
