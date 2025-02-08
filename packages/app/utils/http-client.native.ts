import { fetch as expoFetch } from 'expo/fetch'
import type { HttpClientFunction } from './http-client'
import './structured-clone.polyfill'

export const httpClient: HttpClientFunction = async (input, init) => {
  try {
    const fetchOptions = {
      ...init,
      headers: {
        ...init?.headers,
        Accept: 'text/event-stream',
        'X-Vercel-AI-Data-Stream': 'v1',
      },
    }

    // Convert input to string for native platforms
    const url =
      input instanceof URL ? input.toString() : input instanceof Request ? input.url : String(input)

    const response = await expoFetch(url, fetchOptions as any)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response
  } catch (error) {
    console.error('Native HTTP client error:', error)
    throw error
  }
}
