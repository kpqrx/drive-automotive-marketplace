import type { ButtonProps } from '@/components/atoms/Button/Button.types'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type DropdownItemsType = {
  id: any
  label: ReactNode
  callback: VoidFunction
}[]

export interface DropdownProps extends ComponentPropsWithoutRef<'div'> {
  items: DropdownItemsType
  defaultItemId?: any | null
  anchorPoint?: 'left' | 'right'
  buttonProps?: ButtonProps
  activeButtonClassName?: string
}
