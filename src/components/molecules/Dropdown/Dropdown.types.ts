import type { ButtonProps } from '@/components/atoms/Button/Button.types'
import type { ReactNode } from 'react'

export type DropdownItemsType = {
  label: ReactNode
  callback: VoidFunction
}[]

export interface DropdownProps extends ButtonProps {
  items: DropdownItemsType
  defaultItem?: number
  align?: 'start' | 'end'
}
