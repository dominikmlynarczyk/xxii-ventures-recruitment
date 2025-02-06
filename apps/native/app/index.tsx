import { HomeScreen } from '@xxii-ventures/app/features/home/screen'
import { Stack } from 'expo-router'

const Screen = () => (
  <>
    <Stack.Screen
      options={{
        title: '',
        headerShown: false,
      }}
    />
    <HomeScreen />
  </>
)

export default Screen
