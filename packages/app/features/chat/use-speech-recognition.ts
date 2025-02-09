export const { useSpeechRecognition } =
  process.env.TAMAGUI_TARGET === 'web'
    ? require('./use-speech-recognition.web')
    : require('./use-speech-recognition.native')
