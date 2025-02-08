import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const POST = async (req: Request) => {
  try {
    const { messages } = await req.json()

    const result = streamText({
      model: openai('gpt-4o'),
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
