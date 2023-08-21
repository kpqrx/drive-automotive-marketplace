import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

export interface ChipProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<'span'> {}
