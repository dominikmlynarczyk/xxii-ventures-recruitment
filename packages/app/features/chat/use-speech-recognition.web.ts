import { useCallback, useEffect } from 'react'
import SpeechRecognition, {
  useSpeechRecognition as useWebSpeechRecognition,
} from 'react-speech-recognition'
import { useToast } from '../../hooks/use-toast'

export const useSpeechRecognition = ({
  onTranscript,
}: {
  onTranscript: (text: string) => void
}) => {
  const toast = useToast()

  const { transcript, listening, browserSupportsSpeechRecognition, isMicrophoneAvailable } =
    useWebSpeechRecognition()

  const startRecognition = useCallback(async () => {
    try {
      if (!browserSupportsSpeechRecognition) {
        toast.error('Speech recognition is not supported in this browser')
        return
      }

      if (!isMicrophoneAvailable) {
        toast.error('Microphone permission is required')
        return
      }

      await SpeechRecognition.startListening({
        continuous: true,
      })
    } catch (error) {
      console.error('Failed to start speech recognition:', error)
      toast.error('Failed to start speech recognition')
    }
  }, [browserSupportsSpeechRecognition, isMicrophoneAvailable, toast])

  const stopRecognition = useCallback(() => {
    SpeechRecognition.stopListening()
  }, [])

  useEffect(() => {
    if (transcript) {
      onTranscript(transcript)
    }
  }, [transcript, onTranscript])

  return {
    isRecognizing: listening,
    startRecognition,
    stopRecognition,
  }
}
