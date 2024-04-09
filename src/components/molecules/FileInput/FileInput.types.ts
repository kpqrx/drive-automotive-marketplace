import type { HTMLProps } from 'react'

export interface FileInputProps extends HTMLProps<HTMLInputElement> {
  label?: string
  placeholderHeading?: string
  placeholderDescription?: string
  dragPlaceholderHeading?: string
  dragPlaceholderDescription?: string
  error?: string
}
