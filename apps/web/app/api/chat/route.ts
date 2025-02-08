import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const POST = async (req: Request) => {
  try {
    const { messages, data: imageData } = await req.json()

    const initialMessages = messages.slice(0, -1)
    const currentMessage = messages[messages.length - 1]

    const result = streamText({
      model: openai('gpt-4o'),
      messages: imageData
        ? [
            ...initialMessages,
            {
              role: 'user',
              content: [
                { type: 'text', text: currentMessage.content },
                { type: 'image', image: imageData.replace(/^data:image\/\w+;base64,/, '') },
              ],
            },
          ]
        : messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Failed to process chat request', error)
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
