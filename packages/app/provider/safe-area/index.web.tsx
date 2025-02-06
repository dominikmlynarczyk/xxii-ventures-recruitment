import type { ReactElement } from 'react'

/**
 * @summary: No-op SafeArea provider for Web
 * @description: On Web, we don't use React Navigation, so we are going to avoid the safe area provider instead, we just have a no-op here. Using the CSS selector for env(safe-area-inset-top) on Web is a better solution (check `./use-safe-area.web.ts`).
 * @see: https://solito.dev/recipes/tree-shaking
 * for more, see: https://solito.dev/recipes/tree-shaking
 */
export const SafeArea = ({ children }: { children: ReactElement }) => <>{children}</>
