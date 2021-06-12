import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FarmingTable } from '@/components/farmingTable/FarmingTable'
import { FarmInfo } from '@/components/farmInfo/FarmInfo'
import { observer } from 'mobx-react'
import { useStores } from '@/stores/utils'
import * as Styled from './styles'
import { Wallet } from '@/components/Wallet'
import { validateAddress } from '@/utils/utils'
import { PATHS } from '@/routes'
import { Panel } from '@/App/styles/AppJsStyles'
import { AddTokens } from '@/components/addTokens/AddTokens'

type CheckBalanceProps = {}

export const CheckBalance: React.FC<CheckBalanceProps> = observer((props) => {
  const { assetsStore, appStore, savedGasStore, metaMaskStore } = useStores()
  const { address } = useParams<{ address: string }>()
  const history = useHistory()

  useEffect(() => {
    if (!address || !validateAddress(address)) {
      return history.push(PATHS.main)
    }
    assetsStore.fetch(address)
    savedGasStore.fetch(address)
  }, [address])

  return (
    <Styled.Main style={{ padding: '30px 0' }}>
      <Panel>
        <Wallet />
        <FarmInfo
          isLoadingAssets={assetsStore.isFetching}
          stakedBalance={assetsStore.stakedBalance}
        />
        <FarmingTable
          display={assetsStore.isFetched}
          assets={assetsStore.value}
        />
        {metaMaskStore.walletAddress === appStore.address && <AddTokens />}
      </Panel>
    </Styled.Main>
  )
})
