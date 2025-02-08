import { Platform } from 'react-native'

type MarkdownProps = {
  children: string
}

const MarkdownComponent = Platform.select({
  web: () => require('./markdown.web').Markdown,
  default: () => require('./markdown.native').Markdown,
})()

export const Markdown = ({ children }: MarkdownProps) => (
  <MarkdownComponent>{children}</MarkdownComponent>
)
