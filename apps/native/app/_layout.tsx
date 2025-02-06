import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Provider } from '@xxii-ventures/app/provider'
import { CustomToast } from '@xxii-ventures/ui'

export const unstable_settings = {
  initialRouteName: 'Home',
}

/**
 * @description: Prevent the splash screen from auto-hiding before asset loading is complete.
 */
SplashScreen.preventAutoHideAsync()

const RootLayoutNav = () => {
  const colorScheme = useColorScheme()

  return (
    <Provider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack />
        <CustomToast />
      </ThemeProvider>
    </Provider>
  )
}

const App = () => {
  const [fontLoaded, fontError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

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

  return <RootLayoutNav />
}

export default App
