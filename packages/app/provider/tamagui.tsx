import { useColorScheme } from 'react-native'
import {
  CustomToast,
  TamaguiProvider as TamaguiProviderOrig,
  ToastProvider,
  config,
  isWeb,
} from '@xxii-ventures/ui'
import type { ReactNode } from 'react'

type TamaguiProviderProps = {
  children: ReactNode
}

export const TamaguiProvider = ({ children }: TamaguiProviderProps) => {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? 'dark' : 'light'

  return (
    <TamaguiProviderOrig config={config} defaultTheme={theme}>
      <ToastProvider swipeDirection="horizontal" duration={6_000} native={isWeb ? [] : ['mobile']}>
        {children}
        <CustomToast />
      </ToastProvider>
    </TamaguiProviderOrig>
  )
}
