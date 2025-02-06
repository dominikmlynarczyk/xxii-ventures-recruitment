import { useToastController } from '@tamagui/toast'

type ToastType = 'success' | 'error' | 'info'

export const useToast = () => {
  const toast = useToastController()

  const showToast = (message: string, type: ToastType = 'info') => {
    const theme = {
      success: 'green',
      error: 'red',
      info: 'blue',
    }[type]

    toast.show(message, {
      theme,
      duration: 2_000,
    })
  }

  return {
    success: (message: string) => showToast(message, 'success'),
    error: (message: string) => showToast(message, 'error'),
    info: (message: string) => showToast(message, 'info'),
  }
}
