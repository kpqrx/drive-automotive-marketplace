import type { PropsWithChildren } from 'react'
import type { Control, FieldValues } from 'react-hook-form'

export interface CheckboxGroupProps<T extends FieldValues>
  extends PropsWithChildren {
  className?: string
  name: string
  items: {
    label: string
    value: string | number
  }[]
  control: Control<T>
  error?: string
}
