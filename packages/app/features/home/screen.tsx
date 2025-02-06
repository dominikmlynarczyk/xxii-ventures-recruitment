import { H1, Paragraph, Separator, YStack } from '@xxii-ventures/ui'

export const HomeScreen = () => {
  return (
    <YStack flex={1} justify="center" items="center" gap="$8" p="$4" bg="$background">
      <YStack gap="$4">
        <H1 text="center" color="$color12">
          Welcome to XXII Ventures.
        </H1>
        <Paragraph color="$color10" text="center">
          Recruitment task boilerplate
        </Paragraph>
        <Separator />
      </YStack>
    </YStack>
  )
}
