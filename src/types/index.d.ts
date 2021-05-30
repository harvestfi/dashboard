export type {
  IPool,
  IVault,
  IAssetsInfo,
  IAssetsInfoBigNumber,
} from './Entities'

declare module '*.gql' {
  import { DocumentNode } from 'graphql'
  const Schema: DocumentNode

  export = Schema
}
