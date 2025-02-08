import type { RequestInfo, RequestInit, Response } from 'node-fetch'

export type HttpClientFunction = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>

export const httpClient: HttpClientFunction =
  process.env.TAMAGUI_TARGET === 'web'
    ? require('./http-client.web').httpClient
    : require('./http-client.native').httpClient
