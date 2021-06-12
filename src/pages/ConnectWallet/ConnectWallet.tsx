import React from 'react'
import { EnterReadOnlyAddress } from '@/components/EnterReadOnlyAddress'
import { observer } from 'mobx-react'

type ConnectWalletProps = {}

export const ConnectWallet: React.FC<ConnectWalletProps> = observer((props) => {
  return <EnterReadOnlyAddress />
})
