import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

export interface ContainerProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<'div'> {}
