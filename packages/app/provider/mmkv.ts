import { MMKV } from 'react-native-mmkv'

export const mmkv = new MMKV({
  id: 'app-storage',
  encryptionKey: 'xxii-ventures-app-key',
})
