import type { FC, ReactNode } from 'react'

export type NavigationProps = {
  children: ReactNode
}

export const NavigationProvider: FC<NavigationProps> =
  process.env.TAMAGUI_TARGET === 'web'
    ? require('./navigation.web').NavigationProvider
    : require('./navigation.native').NavigationProvider
