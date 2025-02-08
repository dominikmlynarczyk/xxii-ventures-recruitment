import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Platform } from 'react-native'

export type ImageAttachment = {
  uri: string
  previewUri: string
  type: string
  base64?: string
  name?: string
}

export const useImagePicker = () => {
  const [isLoading, setIsLoading] = useState(false)

  const pickImage = async (): Promise<ImageAttachment | null> => {
    try {
      setIsLoading(true)

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        throw new Error('Permission to access media library was denied')
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
        base64: true,
      })

      if (result.canceled) {
        return null
      }

      const asset = result.assets[0]
      if (!asset) {
        return null
      }

      // Extract MIME type from the data URI if present
      let mimeType = 'image/jpeg' // default mime type
      if (asset.uri.startsWith('data:')) {
        const matches = asset.uri.match(/^data:([^;]+);/)
        if (matches && matches[1]) {
          mimeType = matches[1]
        }
      } else {
        // Get the file extension from the URI
        const extension = asset.uri.split('.').pop()?.toLowerCase() || 'jpg'
        mimeType = `image/${extension === 'jpg' ? 'jpeg' : extension}`
      }

      const name = Platform.select({
        web: asset.uri.split('/').pop() || `image.${mimeType.split('/')[1]}`,
        default: asset.uri.split('/').pop() || `image.${mimeType.split('/')[1]}`,
      })

      // On web, both URIs are the same data URI
      // On native, we keep the original URI for preview and create a data URI for API
      const uri = Platform.select({
        web: asset.uri,
        default: asset.base64 ? `data:${mimeType};base64,${asset.base64}` : asset.uri,
      }) as string

      return {
        uri,
        previewUri: asset.uri, // Original URI for preview
        type: mimeType,
        base64: asset.base64 || undefined,
        name,
      }
    } catch (error) {
      console.error('Error picking image:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    pickImage,
    isLoading,
  }
}
