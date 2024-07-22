import type { CheckboxProps } from '@/components/molecules/Checkbox/Checkbox.types'
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

export interface CheckboxGroupProps
  extends Omit<ComponentPropsWithoutRef<'fieldset'>, 'onChange'>,
    PropsWithChildren {
  label: string
  name: string
  items?: {
    id: number
    label: string
    value?: string
  }[]
  itemProps?: Partial<Omit<CheckboxProps, 'value' | 'name' | 'children'>>
  defaultValue?: string[]
  onChange?: (value: string) => void
}
