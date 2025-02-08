import { useEffect, useState, type FC } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { usePathname, useRouter } from 'solito/navigation'
import { useAuthStore } from '../../features/auth/auth.store'
import type { NavigationProps } from '.'
import { Header } from './header.web'

export const NavigationProvider: FC<NavigationProps> = ({ children }) => {
  const router = useRouter()
  const { isAuthenticated, isAuthStateHydrated } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      isAuthStateHydrated: state._hasHydrated,
    }))
  )
  const [isNavigationReady, setIsNavigationReady] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      if (isAuthenticated && (pathname === '/auth' || pathname === '/')) {
        router.replace('/chat')
        setIsNavigationReady(true)
        return
      }

      if (
        !isAuthenticated &&
        (pathname === '/chat' || pathname === '/profile' || pathname === '/')
      ) {
        router.replace('/auth')
        setIsNavigationReady(true)
        return
      }

      setIsNavigationReady(true)
    }

    if (!isAuthStateHydrated) {
      return
    }

    checkAuth()
  }, [isAuthenticated, isAuthStateHydrated])

  if (!isNavigationReady) {
    return null
  }

  return (
    <>
      {isAuthenticated && <Header />}
      {children}
    </>
  )
}
