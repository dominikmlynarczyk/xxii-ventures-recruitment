import { useCallback, useRef, useState } from 'react'
import { FlatList, Keyboard, Platform, KeyboardAvoidingView } from 'react-native'
import {
  Button,
  H4,
  Image,
  Input,
  Paragraph,
  Spinner,
  XStack,
  YStack,
  Sheet,
} from '@xxii-ventures/ui'
import { Camera, Send, Settings } from '@tamagui/lucide-icons'
import { useChatStore } from './chat.store'
import * as ImagePicker from 'expo-image-picker'
import { useToast } from '../../hooks/use-toast'
import { useSafeArea } from '../../provider/safe-area/use-safe-area'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  attachments?: Array<{
    type: 'image'
    url: string
  }>
}

export const ChatScreen = () => {
  const [message, setMessage] = useState('')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const flatListRef = useRef<FlatList>(null)
  const { top, bottom } = useSafeArea()

  const {
    messages,
    isStreaming,
    sendMessage,
    apiKey: storedApiKey,
    setApiKey: setStoredApiKey,
  } = useChatStore()

  const toast = useToast()

  const bottomSpacing = Platform.select({
    ios: bottom - 16,
    android: bottom + 16,
  })

  const topSpacing = Platform.select({
    ios: top - 16,
    android: top,
  })

  const handleSend = async () => {
    if (!message.trim()) return

    Keyboard.dismiss()
    const currentMessage = message
    setMessage('')

    await sendMessage(currentMessage)
    flatListRef.current?.scrollToEnd({ animated: true })
  }

  const handleAttachImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
      })

      if (!result.canceled) {
        // In a real app, we would upload this to a storage service
        // For now, we'll just use the local URI
        await sendMessage('', [{ type: 'image', url: result.assets[0].uri }])
      }
    } catch (error) {
      toast.error('Failed to attach image')
    }
  }

  const renderMessage = useCallback(({ item }: { item: ChatMessage }) => {
    const isUser = item.role === 'user'

    return (
      <YStack
        p="$4"
        my="$2"
        mx="$4"
        background={isUser ? '$blue5' : '$gray5'}
        borderRadius="$4"
        alignSelf={isUser ? 'flex-end' : 'flex-start'}
        maxWidth="80%"
      >
        {item.attachments?.map((attachment, index) => (
          <Image
            key={index}
            source={{ uri: attachment.url }}
            width={200}
            height={200}
            borderRadius="$2"
            mb="$2"
          />
        ))}
        <Paragraph>{item.content}</Paragraph>
      </YStack>
    )
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={8}
    >
      <YStack flex={1} pt={topSpacing}>
        <XStack
          p="$4"
          background="$background"
          borderBottomWidth={1}
          borderBottomColor="$borderColor"
          justify="space-between"
          items="center"
        >
          <H4>Chat</H4>
          <Button
            icon={Settings}
            circular
            variant="outlined"
            onPress={() => setIsSettingsOpen(true)}
          />
        </XStack>

        {/* TODO: Replace with performant FlashList */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
          onLayout={() => flatListRef.current?.scrollToEnd()}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
        />

        <XStack
          p="$4"
          pb={bottomSpacing}
          gap="$2"
          background="$background"
          borderTopWidth={1}
          borderTopColor="$borderColor"
        >
          <Button
            icon={Camera}
            circular
            variant="outlined"
            onPress={handleAttachImage}
            disabled={isStreaming}
          />
          <Input
            flex={1}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            onSubmitEditing={handleSend}
            editable={!isStreaming}
            autoCapitalize="none"
            returnKeyType="send"
            blurOnSubmit={false}
          />
          <Button
            icon={isStreaming ? () => <Spinner /> : Send}
            circular
            disabled={!message.trim() || isStreaming}
            onPress={handleSend}
          />
        </XStack>
      </YStack>

      <Sheet
        modal
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        snapPoints={[50]}
        position={0}
        dismissOnSnapToBottom
      >
        <Sheet.Frame p="$4" gap="$4">
          <Sheet.Handle />
          <H4>Settings</H4>
          <Input
            placeholder="OpenAI API Key"
            value={apiKey}
            onChangeText={setApiKey}
            secureTextEntry
          />
          <Button
            onPress={() => {
              setStoredApiKey(apiKey)
              setIsSettingsOpen(false)
              toast.success('API key saved')
            }}
          >
            Save API Key
          </Button>
        </Sheet.Frame>
      </Sheet>
    </KeyboardAvoidingView>
  )
}
