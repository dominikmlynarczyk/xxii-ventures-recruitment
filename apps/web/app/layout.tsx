import type { Metadata } from 'next'
import { NextTamaguiProvider } from './NextTamaguiProvider'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Tamagui • App Router',
  description: 'Tamagui, Solito, Expo & Next.js',
  icons: '/favicon.ico',
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    // You can use `suppressHydrationWarning` to avoid the warning about mismatched content during hydration in dev mode
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextTamaguiProvider>{children}</NextTamaguiProvider>
      </body>
    </html>
  )
}

export default RootLayout
