import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

export interface OfferDescriptionProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<'div'> {
  data: string
}
