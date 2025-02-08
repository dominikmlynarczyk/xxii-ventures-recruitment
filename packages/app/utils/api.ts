import Constants from 'expo-constants'
import { Platform } from 'react-native'

/**
 * Generates an API URL based on the current environment
 * For web, it uses the current origin
 * For native, it uses the API URL from environment variables
 */
export function generateAPIUrl(path: string): string {
  if (Platform.OS === 'web') {
    return `${window.location.origin}${path}`
  }

  // For native platforms, use localhost with the correct port
  // Note: On iOS simulator, localhost refers to the simulator
  // On Android emulator, use 10.0.2.2 instead of localhost
  const host = Platform.select({
    ios: 'localhost',
    android: '10.0.2.2',
  })

  return `http://${host}:3000${path}`
}
