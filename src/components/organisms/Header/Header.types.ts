import type { ComponentPropsWithoutRef } from 'react'

export interface HeaderProps extends ComponentPropsWithoutRef<'header'> {
  label?: string
  withMenu?: boolean
}
