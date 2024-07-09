import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

export interface UserActionPanelProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<'span'> {
  size?: 'sm' | 'lg'
}
