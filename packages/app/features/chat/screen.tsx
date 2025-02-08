import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Keyboard, Platform, KeyboardAvoidingView } from 'react-native'
import { Button, H4, Input, Spinner, XStack, YStack, Sheet, styled } from '@xxii-ventures/ui'
import { Camera, Send, Settings } from '@tamagui/lucide-icons'
import * as ImagePicker from 'expo-image-picker'
import { useToast } from '../../hooks/use-toast'
import { useSafeArea } from '../../provider/safe-area/use-safe-area'
import { useChat } from '@ai-sdk/react'
import { httpClient } from '../../utils/http-client'
import { generateAPIUrl } from '../../utils/api'
import { Message } from './message'
import { usePersistedMessages, type ChatMessage } from './use-persisted-messages'

export const ChatScreen = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const flatListRef = useRef<FlatList>(null)
  const { top, bottom } = useSafeArea()
  const toast = useToast()

  const {
    messages,
    setMessages,
    error,
    handleInputChange: handleAIInputChange,
    input,
    handleSubmit,
    status,
  } = useChat({
    fetch: httpClient as unknown as typeof globalThis.fetch,
    api: generateAPIUrl('/api/chat'),
    onError: (error) => {
      console.error(error)
      toast.error('Failed to send message')
    },
  })
  usePersistedMessages({
    messages,
    updateMessages: setMessages,
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  const handleInputChange = (text: string) => {
    handleAIInputChange({ target: { value: text } } as any)
  }

  const bottomSpacing = Platform.select({
    ios: bottom,
    android: bottom + 16,
  })

  const topSpacing = Platform.select({
    ios: top,
    android: top,
  })

  const handleSend = async (e?: any) => {
    e?.preventDefault()

    if (!input.trim()) return

    Keyboard.dismiss()
    handleSubmit(e)
  }

  const handleAttachImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
      })

      if (!result.canceled) {
        toast.info('Image attachments coming soon')
      }
    } catch (error) {
      toast.error('Failed to attach image')
    }
  }

  const renderMessage = useCallback(
    ({ item }: { item: ChatMessage }) => (
      <Message
        content={item.content}
        isUser={item.role === 'user'}
        attachments={item.attachments}
      />
    ),
    []
  )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
    >
      <YStack flex={1} background="$background" pt={topSpacing}>
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

        <YStack flex={1} background="$background">
          {/* TODO: Replace with performant FlashList */}
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingBottom: 16,
            }}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
            onContentSizeChange={() => {
              flatListRef.current?.scrollToEnd({ animated: true })
            }}
          />
        </YStack>

        <XStack
          p="$4"
          pb={bottomSpacing}
          gap="$2"
          background="$background"
          borderTopWidth={1}
          borderTopColor="$borderColor"
          {...Platform.select({
            web: {
              position: 'sticky',
              bottom: 0,
            },
            default: {},
          })}
        >
          <Button
            icon={Camera}
            circular
            variant="outlined"
            onPress={handleAttachImage}
            disabled={isLoading}
          />
          <Input
            flex={1}
            value={input}
            onChangeText={handleInputChange}
            placeholder="Type a message..."
            onSubmitEditing={handleSend}
            editable={!isLoading}
            autoCapitalize="none"
            returnKeyType="send"
            blurOnSubmit={false}
          />
          <Button
            icon={isLoading ? () => <Spinner /> : Send}
            circular
            disabled={!input.trim() || isLoading}
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
