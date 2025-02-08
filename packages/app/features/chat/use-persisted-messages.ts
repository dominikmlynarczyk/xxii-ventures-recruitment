import { useEffect, useRef } from 'react'
import { storage } from '../../provider/storage'
import type { Message as UIMessage } from 'ai'

export type ChatMessage = UIMessage & {
  timestamp?: number
  attachments?: Array<{
    type: 'image'
    url: string
  }>
}

export const usePersistedMessages = ({
  messages,
  updateMessages,
}: {
  messages: UIMessage[]
  updateMessages: (messages: UIMessage[]) => void
}) => {
  const isInitialMount = useRef(true)

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const savedMessages = await storage.getItem('chat-messages')
        if (savedMessages) {
          updateMessages(JSON.parse(savedMessages))
        }
      } catch (error) {
        console.error('Failed to load messages:', error)
      }
    }
    loadMessages()
  }, [updateMessages])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      if (messages.length === 0) return
    }

    storage.setItem('chat-messages', JSON.stringify(messages))
  }, [messages])

  return messages
}
