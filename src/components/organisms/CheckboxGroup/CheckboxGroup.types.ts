import type { CheckboxProps } from '@/components/molecules/Checkbox/Checkbox.types'
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

export interface CheckboxGroupProps
  extends ComponentPropsWithoutRef<'fieldset'>,
    PropsWithChildren {
  label: string
  items: {
    label: string
    name: string
    value: string
  }[]
  itemProps?: Partial<Omit<CheckboxProps, 'value' | 'name' | 'children'>>
}
