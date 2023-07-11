import type {
  ComponentPropsWithoutRef,
  HTMLAttributes,
  PropsWithChildren,
} from 'react'

type BaseProps = ComponentPropsWithoutRef<'a'> &
  ComponentPropsWithoutRef<'button'>
export interface ButtonProps extends PropsWithChildren, BaseProps {
  variant?: 'primary' | 'secondary'
  size?: 'large' | 'small'
  href?: string
}
