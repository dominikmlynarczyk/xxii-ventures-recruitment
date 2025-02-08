import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Keyboard, Platform, KeyboardAvoidingView } from 'react-native'
import { Button, H4, Input, Spinner, XStack, YStack, Sheet, SolitoImage } from '@xxii-ventures/ui'
import { Camera, Send, Settings, X } from '@tamagui/lucide-icons'
import { useToast } from '../../hooks/use-toast'
import { useSafeArea } from '../../provider/safe-area/use-safe-area'
import { useChat } from '@ai-sdk/react'
import { httpClient } from '../../utils/http-client'
import { generateAPIUrl } from '../../utils/api'
import { Message } from './message'
import { usePersistedMessages, type ChatMessage } from './use-persisted-messages'
import { useImagePicker, type ImageAttachment } from './use-image-picker'
import { useMessagesDedupe } from './use-messages-dedupe'

export const ChatScreen = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const flatListRef = useRef<FlatList>(null)
  const { top, bottom } = useSafeArea()
  const toast = useToast()

  const [currentAttachment, setCurrentAttachment] = useState<ImageAttachment | null>(null)
  const { pickImage, isLoading: isImagePickerLoading } = useImagePicker()

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
  useMessagesDedupe({
    messages,
    setMessages,
    status,
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

    if (!input.trim() && !currentAttachment) return

    Keyboard.dismiss()

    if (currentAttachment) {
      const newMessage = {
        id: Date.now().toString(),
        role: 'user' as const,
        content: input,
        attachments: [
          {
            type: 'image' as const,
            url: currentAttachment.previewUri,
          },
        ],
      }

      setMessages((prev) => [...prev, newMessage])

      handleSubmit(e, { data: currentAttachment.uri })
      setCurrentAttachment(null)

      return
    }

    handleSubmit(e)
  }

  const handleAttachImage = async () => {
    try {
      const attachment = await pickImage()
      if (attachment) {
        setCurrentAttachment(attachment)
        toast.success('Image attached')
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

        <YStack
          p="$4"
          pb={bottomSpacing}
          gap="$2"
          background="$background"
          borderTopWidth={1}
          borderTopColor="$borderColor"
          {...Platform.select({
            web: {
              position: 'sticky',
              bottom: '0.5rem',
              width: '90%',
              mx: 'auto',
              bg: '$backgroundPress',
              borderRadius: '$8',
            },
            default: {},
          })}
        >
          {currentAttachment && (
            <XStack height={100} width="100%" position="relative" p="$2" mb="$4">
              <SolitoImage
                src={currentAttachment.previewUri}
                width={100}
                height={100}
                alt="Attachment preview"
                resizeMode="cover"
              />
              <Button
                position="absolute"
                icon={X}
                t={0}
                r={0}
                size="$2"
                circular
                theme="red"
                onPress={() => setCurrentAttachment(null)}
              />
            </XStack>
          )}
          <XStack gap="$2">
            <Button
              icon={Camera}
              circular
              variant="outlined"
              onPress={handleAttachImage}
              disabled={isLoading || isImagePickerLoading}
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
              disabled={(!input.trim() && !currentAttachment) || isLoading}
              onPress={handleSend}
            />
          </XStack>
        </YStack>
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
