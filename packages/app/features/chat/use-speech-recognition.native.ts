import { useCallback, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition'
import { useToast } from '../../hooks/use-toast'

export const useSpeechRecognition = ({
  onTranscript,
}: {
  onTranscript: (text: string) => void
}) => {
  const [isRecognizing, setIsRecognizing] = useState(false)
  const toast = useToast()

  useSpeechRecognitionEvent('start', () => setIsRecognizing(true))
  useSpeechRecognitionEvent('end', () => setIsRecognizing(false))
  useSpeechRecognitionEvent('result', (event) => {
    const transcript = event.results[0]?.transcript
    if (transcript) {
      onTranscript(transcript)
    }
  })
  useSpeechRecognitionEvent('error', (event) => {
    console.error('Speech recognition error:', event.error, event.message)
    toast.error('Speech recognition failed')
    setIsRecognizing(false)
  })

  const startRecognition = useCallback(async () => {
    try {
      // Request both microphone and speech recognition permissions on iOS
      if (Platform.OS === 'ios') {
        const micPermission = await ExpoSpeechRecognitionModule.requestMicrophonePermissionsAsync()
        const speechPermission =
          await ExpoSpeechRecognitionModule.requestSpeechRecognizerPermissionsAsync()

        if (!micPermission.granted || !speechPermission.granted) {
          toast.error('Both microphone and speech recognition permissions are required')
          return
        }
      } else {
        const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync()
        if (!result.granted) {
          toast.error('Microphone permission is required')
          return
        }
      }

      // Check if recognition is available
      const isAvailable = await ExpoSpeechRecognitionModule.isRecognitionAvailable()
      if (!isAvailable) {
        toast.error('Speech recognition is not available on this device')
        return
      }

      ExpoSpeechRecognitionModule.start({
        lang: 'en-US',
        interimResults: true,
        maxAlternatives: 1,
        continuous: false,
        // Improve accuracy for single-word prompts
        ...(Platform.OS === 'ios'
          ? {
              iosTaskHint: 'dictation',
              iosCategory: {
                category: 'playAndRecord',
                categoryOptions: ['defaultToSpeaker', 'allowBluetooth'],
                mode: 'measurement',
              },
            }
          : {
              androidIntentOptions: {
                EXTRA_LANGUAGE_MODEL: 'web_search',
              },
            }),
      })
    } catch (error) {
      console.error('Failed to start speech recognition:', error)
      toast.error('Failed to start speech recognition')
    }
  }, [toast])

  const stopRecognition = useCallback(() => {
    if (isRecognizing) {
      ExpoSpeechRecognitionModule.stop()
    }
  }, [isRecognizing])

  useEffect(() => {
    return () => {
      if (isRecognizing) {
        ExpoSpeechRecognitionModule.stop()
      }
    }
  }, [isRecognizing])

  return {
    isRecognizing,
    startRecognition,
    stopRecognition,
  }
}
