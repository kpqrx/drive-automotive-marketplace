import type { ComponentPropsWithoutRef } from 'react'
import type { IconType } from 'react-icons'

export interface OfferTileProps extends ComponentPropsWithoutRef<'a'> {
  href: string
  icon: IconType
  label: string
  description: string
  location: string
  price: string
  thumbnailSrc: string
  properties: string[]
  orientation?: 'horizontal' | 'vertical'
}
