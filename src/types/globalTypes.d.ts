/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OrderDirection {
  asc = 'asc',
  desc = 'desc',
}

export enum PoolType {
  NoMintRewardPool = 'NoMintRewardPool',
  PotPool = 'PotPool',
}

export enum Pool_orderBy {
  id = 'id',
  rewardTokens = 'rewardTokens',
  rewards = 'rewards',
  timestamp = 'timestamp',
  transaction = 'transaction',
  type = 'type',
  vault = 'vault',
}

export enum ProfitLogType {
  ProfitAndBuybackLog = 'ProfitAndBuybackLog',
  ProfitLogInReward = 'ProfitLogInReward',
}

export enum Vault_orderBy {
  currPool = 'currPool',
  currStrategy = 'currStrategy',
  deposits = 'deposits',
  doHardWorks = 'doHardWorks',
  fToken = 'fToken',
  id = 'id',
  strategies = 'strategies',
  timestamp = 'timestamp',
  transaction = 'transaction',
  underlying = 'underlying',
  withdrawals = 'withdrawals',
}

export interface Block_height {
  hash?: any | null
  number?: number | null
}

export interface Pool_filter {
  id?: string | null
  id_not?: string | null
  id_gt?: string | null
  id_lt?: string | null
  id_gte?: string | null
  id_lte?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  timestamp?: any | null
  timestamp_not?: any | null
  timestamp_gt?: any | null
  timestamp_lt?: any | null
  timestamp_gte?: any | null
  timestamp_lte?: any | null
  timestamp_in?: any[] | null
  timestamp_not_in?: any[] | null
  transaction?: string | null
  transaction_not?: string | null
  transaction_gt?: string | null
  transaction_lt?: string | null
  transaction_gte?: string | null
  transaction_lte?: string | null
  transaction_in?: string[] | null
  transaction_not_in?: string[] | null
  transaction_contains?: string | null
  transaction_not_contains?: string | null
  transaction_starts_with?: string | null
  transaction_not_starts_with?: string | null
  transaction_ends_with?: string | null
  transaction_not_ends_with?: string | null
  vault?: string | null
  vault_not?: string | null
  vault_gt?: string | null
  vault_lt?: string | null
  vault_gte?: string | null
  vault_lte?: string | null
  vault_in?: string[] | null
  vault_not_in?: string[] | null
  vault_contains?: string | null
  vault_not_contains?: string | null
  vault_starts_with?: string | null
  vault_not_starts_with?: string | null
  vault_ends_with?: string | null
  vault_not_ends_with?: string | null
  type?: PoolType | null
  type_not?: PoolType | null
  rewardTokens?: string[] | null
  rewardTokens_not?: string[] | null
  rewardTokens_contains?: string[] | null
  rewardTokens_not_contains?: string[] | null
}

export interface Vault_filter {
  id?: string | null
  id_not?: string | null
  id_gt?: string | null
  id_lt?: string | null
  id_gte?: string | null
  id_lte?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  timestamp?: any | null
  timestamp_not?: any | null
  timestamp_gt?: any | null
  timestamp_lt?: any | null
  timestamp_gte?: any | null
  timestamp_lte?: any | null
  timestamp_in?: any[] | null
  timestamp_not_in?: any[] | null
  transaction?: string | null
  transaction_not?: string | null
  transaction_gt?: string | null
  transaction_lt?: string | null
  transaction_gte?: string | null
  transaction_lte?: string | null
  transaction_in?: string[] | null
  transaction_not_in?: string[] | null
  transaction_contains?: string | null
  transaction_not_contains?: string | null
  transaction_starts_with?: string | null
  transaction_not_starts_with?: string | null
  transaction_ends_with?: string | null
  transaction_not_ends_with?: string | null
  currStrategy?: string | null
  currStrategy_not?: string | null
  currStrategy_gt?: string | null
  currStrategy_lt?: string | null
  currStrategy_gte?: string | null
  currStrategy_lte?: string | null
  currStrategy_in?: string[] | null
  currStrategy_not_in?: string[] | null
  currStrategy_contains?: string | null
  currStrategy_not_contains?: string | null
  currStrategy_starts_with?: string | null
  currStrategy_not_starts_with?: string | null
  currStrategy_ends_with?: string | null
  currStrategy_not_ends_with?: string | null
  underlying?: string | null
  underlying_not?: string | null
  underlying_gt?: string | null
  underlying_lt?: string | null
  underlying_gte?: string | null
  underlying_lte?: string | null
  underlying_in?: string[] | null
  underlying_not_in?: string[] | null
  underlying_contains?: string | null
  underlying_not_contains?: string | null
  underlying_starts_with?: string | null
  underlying_not_starts_with?: string | null
  underlying_ends_with?: string | null
  underlying_not_ends_with?: string | null
  fToken?: string | null
  fToken_not?: string | null
  fToken_gt?: string | null
  fToken_lt?: string | null
  fToken_gte?: string | null
  fToken_lte?: string | null
  fToken_in?: string[] | null
  fToken_not_in?: string[] | null
  fToken_contains?: string | null
  fToken_not_contains?: string | null
  fToken_starts_with?: string | null
  fToken_not_starts_with?: string | null
  fToken_ends_with?: string | null
  fToken_not_ends_with?: string | null
  currPool?: string | null
  currPool_not?: string | null
  currPool_gt?: string | null
  currPool_lt?: string | null
  currPool_gte?: string | null
  currPool_lte?: string | null
  currPool_in?: string[] | null
  currPool_not_in?: string[] | null
  currPool_contains?: string | null
  currPool_not_contains?: string | null
  currPool_starts_with?: string | null
  currPool_not_starts_with?: string | null
  currPool_ends_with?: string | null
  currPool_not_ends_with?: string | null
}

//==============================================================
// END Enums and Input Objects
//==============================================================
