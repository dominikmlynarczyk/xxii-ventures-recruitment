import { useState } from 'react'
import { useRouter } from 'solito/navigation'
import { Avatar, Button, Form, H1, H4, Input, Sheet, XStack, YStack } from '@xxii-ventures/ui'
import { Camera, LogOut } from '@tamagui/lucide-icons'
import { useAuthStore } from '../auth/auth.store'
import * as ImagePicker from 'expo-image-picker'
import { useToast } from '../../hooks/use-toast'
import { useSafeArea } from '../../provider/safe-area/use-safe-area'

export function ProfileScreen() {
  const router = useRouter()
  const { user, updateProfile, logout } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name ?? '')
  const { top, bottom } = useSafeArea()

  const toast = useToast()

  const handleLogout = () => {
    logout()
    router.replace('/auth')
  }

  const handleUpdateProfile = async () => {
    try {
      updateProfile({ name })
      setIsEditing(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  const handleUpdateAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [1, 1],
      })

      if (!result.canceled) {
        // In a real app, we would upload this to a storage service
        // For now, we'll just use the local URI
        updateProfile({ avatarUrl: result.assets[0].uri })
        toast.success('Avatar updated successfully')
      }
    } catch (error) {
      toast.error('Failed to update avatar')
    }
  }

  return (
    <YStack flex={1} pt={top} pb={bottom}>
      <XStack
        p="$4"
        background="$background"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
        justify="space-between"
        items="center"
      >
        <H4>Profile</H4>
        <Button icon={LogOut} variant="outlined" onPress={handleLogout} theme="red">
          Logout
        </Button>
      </XStack>
      <YStack flex={1} p="$4" gap="$4">
        <YStack items="center" gap="$4">
          <XStack>
            <Avatar circular size="$12">
              <Avatar.Image src={user?.avatarUrl ?? ''} />
              <Avatar.Fallback background="$gray5" />
            </Avatar>
            <Button
              icon={Camera}
              size="$3"
              circular
              position="absolute"
              b={0}
              r={0}
              onPress={handleUpdateAvatar}
            />
          </XStack>

          <Button onPress={() => setIsEditing(true)}>Edit Profile</Button>
        </YStack>

        <YStack space="$4">
          <YStack space="$2">
            <H1 size="$5">Email</H1>
            <Input value={user?.email} editable={false} />
          </YStack>

          <YStack space="$2">
            <H1 size="$5">Name</H1>
            <Input value={user?.name ?? 'Not set'} editable={false} />
          </YStack>
        </YStack>
      </YStack>

      <Sheet
        modal
        open={isEditing}
        onOpenChange={setIsEditing}
        snapPoints={[50]}
        position={0}
        dismissOnSnapToBottom
      >
        <Sheet.Frame p="$4" gap="$4">
          <Sheet.Handle />
          <H1>Edit Profile</H1>
          <Form onSubmit={handleUpdateProfile} gap="$4">
            <Input placeholder="Name" value={name} onChangeText={setName} />
            <Button onPress={handleUpdateProfile}>Save Changes</Button>
          </Form>
        </Sheet.Frame>
      </Sheet>
    </YStack>
  )
}
