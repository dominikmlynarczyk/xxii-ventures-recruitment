import { ToastViewport } from './toast-viewport'
import type { ReactNode } from 'react'
import { Platform } from 'react-native'
import { NavigationProvider } from './navigation'
import { TamaguiProvider } from './tamagui'

type ProviderProps = {
  children: ReactNode
}

export const Provider = ({ children }: ProviderProps) => {
  return (
    <TamaguiProvider>
      <NavigationProvider>
        {children}
        <ToastViewport />
      </NavigationProvider>
    </TamaguiProvider>
  )
}
