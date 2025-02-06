import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { storage } from '../../provider/storage'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  attachments?: Array<{
    type: 'image'
    url: string
  }>
}

type ChatState = {
  messages: Message[]
  isStreaming: boolean
  apiKey: string | null
  setApiKey: (key: string) => void
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  sendMessage: (content: string, attachments?: Message['attachments']) => Promise<void>
  clearMessages: () => void
}

const MOCK_RESPONSES = [
  "I understand you're asking about that. Let me help you with that.",
  "That's an interesting question. Here's what I think...",
  'Based on the information provided, I would suggest...',
  'Let me analyze this for you...',
] as const

const getMockResponse = () => MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)]

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      isStreaming: false,
      apiKey: null,

      setApiKey: (key) => set({ apiKey: key }),

      addMessage: (message) => {
        const newMessage: Message = {
          id: Math.random().toString(36).substring(7),
          timestamp: Date.now(),
          ...message,
        }
        set((state) => ({
          messages: [...state.messages, newMessage],
        }))
      },

      sendMessage: async (content, attachments) => {
        const store = get()
        store.addMessage({ role: 'user', content, attachments })

        set({ isStreaming: true })

        try {
          // If we have an API key, we would implement real OpenAI streaming here
          // For now, we'll just mock a delayed response
          await new Promise((resolve) => setTimeout(resolve, 1000))

          store.addMessage({
            role: 'assistant',
            content: getMockResponse(),
          })
        } finally {
          set({ isStreaming: false })
        }
      },

      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => storage),
    }
  )
)
