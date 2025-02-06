import Constants, { ExecutionEnvironment } from 'expo-constants'

const isExpo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient

import { Toast as TamaguiToast, useToastState } from '@tamagui/toast'
import { YStack } from 'tamagui'

const NativeToast = () => {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) {
    return null
  }

  return (
    <TamaguiToast
      key={currentToast.id}
      duration={currentToast.duration ?? 3000}
      viewportName={currentToast.viewportName ?? 'default'}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="quick"
    >
      <YStack py="$1.5" px="$2">
        <TamaguiToast.Title lineHeight="$1">{currentToast.title}</TamaguiToast.Title>
        {!!currentToast.message && (
          <TamaguiToast.Description>{currentToast.message}</TamaguiToast.Description>
        )}
      </YStack>
    </TamaguiToast>
  )
}

export const CustomToast = () => (isExpo ? null : <NativeToast />)
