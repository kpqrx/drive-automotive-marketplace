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
  onValueChange?: (value: (string | number)[]) => void
  defaultValue?: (string | number)[]
  disabled?: boolean
}
