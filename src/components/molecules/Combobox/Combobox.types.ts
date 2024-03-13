import type { ComponentProps } from 'react'

export type ComboboxItemType = {
  label: string
  value: string
}

export interface ComboboxProps extends ComponentProps<'div'> {
  name?: string
  label: string
  placeholder?: string
  items: ComboboxItemType[]
  disabled?: boolean
  searchInputPlaceholder?: string
}
