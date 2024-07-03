import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

export type ContainerProps<C extends ElementType = 'div'> =
  ComponentPropsWithoutRef<C> & {
    as?: C
    children: ReactNode
    className?: string
  }
