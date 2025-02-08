import { Platform, StyleSheet } from 'react-native'
import MarkdownDisplay from 'react-native-markdown-display'
import { useTheme } from '@xxii-ventures/ui'

type MarkdownProps = {
  children: string
}

export const Markdown = ({ children }: MarkdownProps) => {
  const theme = useTheme()
  const textColor = theme.color?.val ?? '#000000'
  const codeBackground = theme.color02?.val ?? '#f3f4f6'
  const linkColor = theme.blue10?.val ?? '#0077cc'

  const styles = StyleSheet.create({
    body: {
      color: textColor,
      fontSize: 16,
      lineHeight: 24,
    },
    heading1: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 12,
      color: textColor,
    },
    heading2: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
      color: textColor,
    },
    heading3: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 8,
      color: textColor,
    },
    paragraph: {
      marginVertical: 8,
      color: textColor,
    },
    list: {
      marginLeft: 20,
    },
    listItem: {
      marginVertical: 4,
      color: textColor,
    },
    code_inline: {
      fontFamily: Platform.select({
        ios: 'Menlo',
        android: 'monospace',
      }),
      backgroundColor: codeBackground,
      padding: 2,
      borderRadius: 4,
      color: textColor,
    },
    code_block: {
      fontFamily: Platform.select({
        ios: 'Menlo',
        android: 'monospace',
      }),
      backgroundColor: codeBackground,
      padding: 8,
      borderRadius: 8,
      marginVertical: 8,
      color: textColor,
    },
    link: {
      color: linkColor,
      textDecorationLine: 'underline',
    },
  })

  // Prevent crashes by ensuring the input is a string and not empty
  const safeMarkdown = typeof children === 'string' ? children : ''

  return (
    <MarkdownDisplay style={styles} mergeStyle={false}>
      {safeMarkdown}
    </MarkdownDisplay>
  )
}
