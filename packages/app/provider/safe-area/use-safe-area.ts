import { useSafeAreaInsets } from 'react-native-safe-area-context'

/**
 * @description: `export { useSafeAreaInsets as useSafeArea }` breaks autoimport, so we need to manually re-export
 */
const useSafeArea = useSafeAreaInsets
export { useSafeArea }
