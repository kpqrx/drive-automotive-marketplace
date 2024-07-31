import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react'

export interface OfferHeaderProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  label: [string, string]
  icon: (args: HTMLAttributes<SVGSVGElement>) => JSX.Element
  price: number
}
