/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProfitLogType } from './../../../../types/globalTypes.d'

// ====================================================
// GraphQL fragment: ProfitLogFields
// ====================================================

export interface ProfitLogFields {
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
