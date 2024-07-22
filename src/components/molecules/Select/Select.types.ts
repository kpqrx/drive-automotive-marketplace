import type { SelectProps as SelectPrimitiveProps } from '@radix-ui/react-select'
import type { UseFormRegisterReturn } from 'react-hook-form'

export type SelectItemType = {
  id: number
  label: string
  value?: string
}

export interface SelectProps
  extends SelectPrimitiveProps,
    Partial<UseFormRegisterReturn> {
  name?: string
  label: string
  placeholder?: string
  items?: SelectItemType[]
  filterInputPlaceholder?: string
  error?: string
  className?: string
  onSelect?: (value: string) => void
  reset?: boolean
  isLoading?: boolean
}
