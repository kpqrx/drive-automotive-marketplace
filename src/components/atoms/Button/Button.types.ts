import type {
  ComponentPropsWithoutRef,
  PropsWithChildren,
} from 'react'

export type BaseButtonProps = ComponentPropsWithoutRef<'a'> &
  ComponentPropsWithoutRef<'button'>
export interface ButtonProps extends PropsWithChildren, BaseButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'large' | 'small'
  href?: string
}
