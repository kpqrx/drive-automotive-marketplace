import type { SelectProps as SelectPrimitiveProps } from '@radix-ui/react-select'
import type { UseFormRegisterReturn } from 'react-hook-form'

export type SelectItemType = {
  label: string
  value: string | number
}

export interface SelectProps
  extends SelectPrimitiveProps,
    Partial<UseFormRegisterReturn> {
  label: string
  placeholder?: string
  items?: SelectItemType[]
  error?: string
  className?: string
  isLoading?: boolean
}
