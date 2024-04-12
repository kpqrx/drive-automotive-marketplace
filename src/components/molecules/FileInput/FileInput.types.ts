import { ArrowUpIcon } from '@heroicons/react/24/outline'
import type { HTMLProps, ReactElement } from 'react'
type IconType = typeof ArrowUpIcon
export interface FileInputProps extends HTMLProps<HTMLInputElement> {
  label?: string
  placeholderHeading?: string
  placeholderDescription?: string
  dragPlaceholderHeading?: string
  dragPlaceholderDescription?: string
  icon?: IconType
  error?: string
}
