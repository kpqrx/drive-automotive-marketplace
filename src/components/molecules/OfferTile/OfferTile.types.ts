import type { ComponentPropsWithoutRef } from 'react'

export interface OfferTileProps extends ComponentPropsWithoutRef<'a'> {
  href: string
  label: string
  description: string
  price: string
  thumbnailSrc: string
  properties: string[]
}
