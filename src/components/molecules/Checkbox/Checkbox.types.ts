import type { CheckboxProps as CheckboxPrimitiveProps } from '@radix-ui/react-checkbox'

export interface CheckboxProps extends CheckboxPrimitiveProps {
  children: string
  error?: string
}
