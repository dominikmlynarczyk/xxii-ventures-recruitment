import { useEffect, type FC } from 'react'
import { useRouter } from 'solito/navigation'
import { useAuthStore } from '../../features/auth/auth.store'
import { useRootNavigationState, useSegments } from 'expo-router'
import type { NavigationProps } from '.'

export const NavigationProvider: FC<NavigationProps> = ({ children }) => {
  const segments = useSegments()
  const { isAuthenticated } = useAuthStore()
  const navigationState = useRootNavigationState()
  const router = useRouter()

  const isAuthGroup = segments[0] === '(auth)'
  const isTabsGroup = segments[0] === '(tabs)'

  useEffect(() => {
    if (!navigationState?.key) {
      return
    }

    if (!isAuthenticated && !isAuthGroup) {
      router.replace('/auth')
      return
    }

    if (isAuthenticated && !isTabsGroup) {
      router.replace('/(tabs)/')
      return
    }
  }, [isAuthenticated, isAuthGroup, isTabsGroup, navigationState?.key, router])

  return <>{children}</>
}
