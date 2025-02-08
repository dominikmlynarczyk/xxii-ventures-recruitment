import { useEffect } from 'react'

import type { UIMessage } from 'ai'

export const useMessagesDedupe = ({
  messages,
  setMessages,
  status,
}: {
  messages: UIMessage[]
  setMessages: (messages: UIMessage[]) => void
  status: string
}) => {
  useEffect(() => {
    if (status === 'ready' || status === 'submitted') {
      const deduplicatedMessages = messages.filter((current, index, messagesState) => {
        return !(messagesState[index - 1]?.role === 'user' && current?.role === 'user')
      })

      if (deduplicatedMessages.length !== messages.length) {
        setMessages(deduplicatedMessages)
      }
    }
  }, [messages, status])
}
