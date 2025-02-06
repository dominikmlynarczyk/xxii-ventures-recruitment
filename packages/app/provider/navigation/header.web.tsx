import { useRouter } from 'solito/navigation'
import { YStack, XStack, Tabs, Text } from '@xxii-ventures/ui'
import { usePathname } from 'next/navigation'
import { MessageSquare, Settings as SettingsIcon } from '@tamagui/lucide-icons'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <YStack bg="$background" borderBottomColor="$borderColor" borderBottomWidth={1} p="$4">
      <YStack als="flex-end" w={300}>
        <Tabs
          value={pathname}
          onValueChange={(value) => router.push(value)}
          defaultValue="/chat"
          orientation="horizontal"
        >
          <Tabs.List space width="100%" justify="flex-end">
            <Tabs.Trigger
              value="/chat"
              {...(pathname === '/chat' && {
                borderBottomWidth: 1,
                borderBottomColor: '$borderColor',
              })}
            >
              <XStack space="$2" ai="center">
                <MessageSquare size={18} />
                <Text fontFamily="$body">Chat</Text>
              </XStack>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="/profile"
              {...(pathname === '/profile' && {
                borderBottomWidth: 1,
                borderBottomColor: '$borderColor',
              })}
            >
              <XStack space="$2" ai="center">
                <SettingsIcon size={18} />
                <Text fontFamily="$body">Profile</Text>
              </XStack>
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs>
      </YStack>
    </YStack>
  )
}
