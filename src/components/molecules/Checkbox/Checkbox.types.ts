import type { HTMLAttributes } from 'react'

export interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  children: string
  error?: string
  name?: string
  value?: string
}
