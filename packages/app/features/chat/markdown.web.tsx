import { Paragraph, SizableText, YStack, styled, useTheme } from '@xxii-ventures/ui'
import ReactMarkdown from 'react-markdown'

type MarkdownProps = {
  children: string
}

const CodeBlock = styled(YStack, {
  bg: '$backgroundHover',
  p: '$3',
})

const CodeSpan = styled(SizableText, {
  bg: '$backgroundHover',
  px: '$1',
})

export const Markdown = ({ children }: MarkdownProps) => {
  const theme = useTheme()
  const textColor = theme.color?.val ?? '#000000'
  const codeBackground = theme.gray4?.val ?? '#f3f4f6'
  const linkColor = theme.blue10?.val ?? '#0077cc'

  const components = {
    h1: ({ children }) => (
      <SizableText size="$8" fontWeight="bold" mb="$3" color="$color">
        {children}
      </SizableText>
    ),
    h2: ({ children }) => (
      <SizableText size="$7" fontWeight="bold" mb="$3" color="$color">
        {children}
      </SizableText>
    ),
    h3: ({ children }) => (
      <SizableText size="$6" fontWeight="bold" mb="$2" color="$color">
        {children}
      </SizableText>
    ),
    p: ({ children }) => (
      <Paragraph mb="$2" color="$color">
        {children}
      </Paragraph>
    ),
    code: ({ inline, children }) => {
      if (inline) {
        return <CodeSpan color="$color">{children}</CodeSpan>
      }
      return (
        <CodeBlock>
          <SizableText color="$color">{children}</SizableText>
        </CodeBlock>
      )
    },
    a: ({ children, href }) => (
      <SizableText
        color="$blue10"
        textDecorationLine="underline"
        onPress={() => window.open(href, '_blank')}
      >
        {children}
      </SizableText>
    ),
    ul: ({ children }) => (
      <YStack ml="$4" mb="$2">
        {children}
      </YStack>
    ),
    li: ({ children }) => (
      <Paragraph mb="$1" color="$color">
        • {children}
      </Paragraph>
    ),
  }

  return (
    <ReactMarkdown components={components}>
      {typeof children === 'string' ? children : ''}
    </ReactMarkdown>
  )
}
