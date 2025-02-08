import { useState } from 'react'
import { useRouter } from 'solito/navigation'
import { Button, Form, H1, Input, Paragraph, Spinner, XStack, YStack } from '@xxii-ventures/ui'
import { useAuthStore } from './auth.store'
import { useToast } from '../../hooks/use-toast'
import { useSafeArea } from '../../provider/safe-area/use-safe-area'
import { Image } from '@xxii-ventures/ui'
import { useShallow } from 'zustand/react/shallow'

export const AuthScreen = () => {
  const router = useRouter()
  const toast = useToast()
  const { top, bottom } = useSafeArea()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, isLoading } = useAuthStore(
    useShallow((state) => ({ login: state.login, isLoading: state.isLoading }))
  )

  const handleLogin = async () => {
    try {
      await login(email, password)
      router.replace('/chat')
      toast.success('Successfully logged in!')
    } catch (error) {
      toast.error('Invalid credentials')
    }
  }

  return (
    <YStack flex={1} justify="center" items="center" p="$4" gap="$4" pt={top} pb={bottom}>
      <YStack space="$4" maxW={600}>
        <XStack justify="center">
          <Image
            src={require('../../../../assets/icon.png')}
            width={120}
            height={120}
            alt="XXII Ventures"
          />
        </XStack>
        <H1 textAlign="center">Recruitment task</H1>
        <Paragraph textAlign="center" theme="alt2">
          Please sign in to continue
        </Paragraph>

        <Form onSubmit={handleLogin} space="$4">
          <Input
            autoCapitalize="none"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Input
            autoCapitalize="none"
            autoComplete="password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <XStack justify="center">
            <Button
              icon={isLoading ? () => <Spinner /> : undefined}
              disabled={isLoading || !email || !password}
              onPress={handleLogin}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </XStack>
        </Form>
      </YStack>
    </YStack>
  )
}
