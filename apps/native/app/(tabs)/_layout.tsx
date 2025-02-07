import { Tabs } from 'expo-router'
import { MessageSquare, User } from '@tamagui/lucide-icons'
import { useTheme } from '@xxii-ventures/ui'
import { useSafeArea } from '@xxii-ventures/app/provider/safe-area/use-safe-area'

const TabsLayout = () => {
  const theme = useTheme()
  const { bottom } = useSafeArea()

  const activeColor = String(theme.blue10?.val ?? '#006ADC')
  const inactiveColor = String(theme.gray10?.val ?? '#64748B')

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarStyle: {
          height: 50 + bottom,
          paddingBottom: bottom,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <MessageSquare color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
