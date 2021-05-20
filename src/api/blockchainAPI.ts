import { POOL_WITH_EARNED_METHOD_WITH_2_ARGUMENTS } from '@/lib/data/ABIs'
import { Contract } from 'web3-eth-contract'

export class blockchainAPI {
  static async makeRequest(
    contract: Contract,
    methodName: string,
    ...args: any[]
  ): Promise<string | null> {
    let response: string

    try {
      response = contract.methods[methodName](...args).call()
    } catch (error) {
      console.log(
        `An error occurred while calling blockchain method: ${methodName}. Contract address: ${contract._address}. Error: ${error}`,
      )
    }

    return response ?? null
  }

  //  the 'earned' method of a smart-contract can have one or two arguments
  static async getEarned(
    walletAddress: string,
    poolContract: Contract,
    web3,
    poolAddress: string,
  ) {
    const poolContractHavingTwoArguments = new web3.eth.Contract(
      POOL_WITH_EARNED_METHOD_WITH_2_ARGUMENTS,
      poolAddress,
    )
    let earned: string | null = ''
    earned = await blockchainAPI.makeRequest(
      poolContract,
      'earned',
      walletAddress,
    )

    if (earned === null) {
      earned = await blockchainAPI.makeRequest(
        poolContractHavingTwoArguments,
        'earned',
        0,
        walletAddress,
      )
    }

    return earned
  }
}
