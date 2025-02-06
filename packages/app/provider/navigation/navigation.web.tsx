import { useEffect, useState, type FC } from 'react'
import { usePathname, useRouter } from 'solito/navigation'
import { useAuthStore } from '../../features/auth/auth.store'
import type { NavigationProps } from '.'
import { Header } from './header.web'
import { YStack } from '@xxii-ventures/ui'

export const NavigationProvider: FC<NavigationProps> = ({ children }) => {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [isNavigationReady, setIsNavigationReady] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      // If not authenticated and not on auth page, redirect to auth
      if (!isAuthenticated && pathname !== '/auth') {
        await router.replace('/auth')
        setIsNavigationReady(true)
        return
      }

      // If authenticated and on auth page or root, redirect to chat
      if (isAuthenticated && (pathname === '/auth' || pathname === '/')) {
        await router.replace('/chat')
        setIsNavigationReady(true)
        return
      }

      // If authenticated and trying to access protected route, allow it
      if (isAuthenticated && pathname?.startsWith('/')) {
        setIsNavigationReady(true)
        return
      }

      // Default case: set navigation ready
      setIsNavigationReady(true)
    }

    checkAuth()
  }, [isAuthenticated, router])

  // Don't render children until initial navigation is complete
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
