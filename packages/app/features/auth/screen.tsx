import { useState } from 'react'
import { useRouter } from 'solito/navigation'
import {
  Button,
  Form,
  H1,
  Input,
  Paragraph,
  Spinner,
  XStack,
  YStack,
  SolitoImage,
} from '@xxii-ventures/ui'
import { useAuthStore } from './auth.store'
import { useToast } from '../../hooks/use-toast'
import { useSafeArea } from '../../provider/safe-area/use-safe-area'
import { useShallow } from 'zustand/react/shallow'
import { images } from '@xxii-ventures/assets'

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
    <YStack flex={1} items="center" justify="center" p="$4" gap="$4" pt={top} pb={bottom}>
      <YStack gap="$4" width="100%" maxW={600}>
        <XStack items="center" justify="center">
          <SolitoImage
            src={images.logo}
            width={120}
            height={120}
            alt="XXII Ventures"
            resizeMode="contain"
          />
        </XStack>
        <YStack gap="$2" items="center">
          <H1>Recruitment task</H1>
          <Paragraph>Please sign in to continue</Paragraph>
        </YStack>

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

          <XStack items="center" justify="center">
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
