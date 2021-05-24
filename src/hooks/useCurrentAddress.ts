import { useLocation } from 'react-router-dom'
import { PATHS } from '@/routes'
import { useStores } from '@/stores/utils'

export const useCurrentAddress = (): string | null => {
  const { userAssetsStore, assetToCheckStore } = useStores()
  const location = useLocation()

  switch (location.pathname) {
    case PATHS.checkBalance:
      return assetToCheckStore.address

    case PATHS.userDashboard:
      return userAssetsStore.address

    default:
      return null
  }
}
