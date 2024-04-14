import type { HTMLProps } from 'react'

export interface TextEditorProps extends HTMLProps<HTMLInputElement> {
  label: string
  error?: string
  maxCharacters?: number
}
