import type { HttpClientFunction } from './http-client'

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

    const response = await fetch(input, fetchOptions)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response
  } catch (error) {
    console.error('Web HTTP client error:', error)
    throw error
  }
}
