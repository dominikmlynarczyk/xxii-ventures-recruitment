/**
 * @description: We are using the CSS selector for env(safe-area-inset-top) on Web, so we don't need to import the native hook, since:
 * 1. The SafeAreaProvider forces you to render null on Web until it measures
 * 2. No need to support it, unless doing landscape view
 * 3. Package react-native-safe-area-context has a massive import on Web
 * 4. Most importantly: simply use the env(safe-area-inset-bottom) CSS variable instead
 *
 * After all, safe area code is few-and-far-between, so in case of need, write some platform-speciifc code for it,
 * which is probably better than a massive bundle size for little benefit
 */
import type { useSafeArea as nativeHook } from './use-safe-area'

const area = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,

  /**
   * @description: Use CSS env variables like below, prereqs:
   * 1. Need to be sure to override the types for `useSafeArea`
   * 2. Need to be sure to never add numbers and strings when you consue useSafeArea
   * 3. Keep in mind that the env() doesn't work on older browsers
   */
  // top: `env(safe-area-inset-top)`,
  // right: `env(safe-area-inset-right)`,
  // bottom: `env(safe-area-inset-bottom)`,
  // left: `env(safe-area-inset-left)`,
}

export function useSafeArea(): ReturnType<typeof nativeHook> {
  return area
}
