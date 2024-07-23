import type { PopoverProps } from '@radix-ui/react-popover'

export type MultiselectItemType = {
  label: string
  value: string | number
}

export interface MultiselectProps extends PopoverProps {
  name?: string
  label: string
  placeholder?: string
  items?: MultiselectItemType[]
  className?: string
  onSelect?: (value: string) => void
  defaultValue?: (string | number)[]
}
