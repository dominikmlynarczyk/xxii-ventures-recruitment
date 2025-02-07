import { Provider } from '@xxii-ventures/app'
import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useAuthStore } from '@xxii-ventures/app'
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

/**
 * @description: Prevent the splash screen from auto-hiding before asset loading is complete.
 */
SplashScreen.preventAutoHideAsync()

const Layout = () => {
  const [fontLoaded, fontError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  const { isAuthenticated } = useAuthStore()
  const colorScheme = useColorScheme()

  useEffect(() => {
    if (fontLoaded || fontError) {
      /**
       * @description: Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
       */
      SplashScreen.hideAsync()
    }
  }, [fontLoaded, fontError])

  if (!fontLoaded && !fontError) {
    return null
  }

  return (
    <Provider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {!isAuthenticated ? (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        ) : (
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        )}
      </ThemeProvider>
    </Provider>
  )
}

export default Layout
