import type { PropsWithChildren } from 'react'
import type { Control, FieldValues } from 'react-hook-form'

export interface CheckboxGroupProps<T extends FieldValues>
  extends PropsWithChildren {
  className?: string
  name: string
  items?: {
    id: number
    label: string
    value?: string
  }[]
  control: Control<T>
}
