import { config } from '@xxii-ventures/config'

export type Conf = typeof config

declare module '@xxii-ventures/ui' {
  interface TamaguiCustomConfig extends Conf {}
}