export type ComboboxItemType = {
  label: string
  value: string
}

export interface ComboboxProps {
  label: string
  placeholder?: string
  items: ComboboxItemType[]
  disabled?: boolean
  clearLabel?: string
}
