import { Paragraph, Stack, YStack, styled, SolitoImage } from '@xxii-ventures/ui'
import { Markdown } from './markdown'

type MessageProps = {
  content: string
  isUser: boolean
  attachments?: Array<{
    type: 'image'
    url: string
  }>
}

const MessageContainer = styled(Stack, {
  padding: '$4',
  marginVertical: '$2',
  marginHorizontal: '$4',
  borderRadius: '$4',
  width: 'auto',
  maxWidth: '80%',
  variants: {
    isUser: {
      true: {
        alignSelf: 'flex-end',
        backgroundColor: '$blue4',
      },
      false: {
        alignSelf: 'flex-start',
        backgroundColor: '$color3',
      },
    },
  } as const,
})

const MessageContent = styled(YStack, {
  width: '100%',
})

export const Message = ({ content, isUser, attachments }: MessageProps) => {
  return (
    <MessageContainer isUser={isUser}>
      <MessageContent>
        {attachments?.map((attachment, index) => (
          <SolitoImage
            key={index}
            src={attachment.url}
            width={200}
            height={200}
            alt="Message attachment"
            resizeMode="cover"
            style={{
              borderRadius: 16,
              marginBottom: 8,
            }}
          />
        ))}
        {isUser ? <Paragraph color="$color">{content}</Paragraph> : <Markdown>{content}</Markdown>}
      </MessageContent>
    </MessageContainer>
  )
}
