import { Platform } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import type { StateStorage } from 'zustand/middleware'

type StorageAdapter = StateStorage & {
  clearAll: () => void
}

const createWebStorage = (): StorageAdapter => {
  return {
    getItem: (key) => {
      const value = localStorage.getItem(key)
      return value ?? null
    },
    setItem: (key, value) => {
      localStorage.setItem(key, value)
    },
    removeItem: (key) => {
      localStorage.removeItem(key)
    },
    clearAll: () => {
      localStorage.clear()
    },
  }
}

const createNativeStorage = (): StorageAdapter => {
  let mmkv: MMKV | null = null
  let memoryFallback = false

  const getStorage = () => {
    if (memoryFallback) {
      return null
    }

    if (!mmkv) {
      try {
        mmkv = new MMKV({
          id: 'auth-storage',
        })
      } catch (error) {
        memoryFallback = true
        console.warn('Failed to initialize MMKV, falling back to in-memory storage', error)
        return null
      }
    }

    return mmkv
  }

  const memoryStorage = new Map<string, string>()

  return {
    getItem: (key) => {
      try {
        const storage = getStorage()
        if (!storage) {
          return memoryStorage.get(key) ?? null
        }
        const value = storage.getString(key)
        return value ?? null
      } catch (error) {
        console.warn('Error reading from MMKV:', error)
        return memoryStorage.get(key) ?? null
      }
    },
    setItem: (key, value) => {
      const storage = getStorage()

      if (!storage) {
        memoryStorage.set(key, value)
        return
      }

      try {
        storage.set(key, value)
      } catch (error) {
        console.warn('Error writing to MMKV:', error)
        memoryStorage.set(key, value)
      }
    },
    removeItem: (key) => {
      const storage = getStorage()
      if (!storage) {
        memoryStorage.delete(key)
        return
      }

      try {
        storage.delete(key)
      } catch (error) {
        console.warn('Error removing from MMKV:', error)
        memoryStorage.delete(key)
      }
    },
    clearAll: () => {
      const storage = getStorage()
      if (!storage) {
        memoryStorage.clear()
        return
      }

      try {
        storage.clearAll()
      } catch (error) {
        console.warn('Error clearing MMKV:', error)
        memoryStorage.clear()
      }
    },
  }
}

export const storage = Platform.select({
  web: createWebStorage(),
  default: createNativeStorage(),
})
