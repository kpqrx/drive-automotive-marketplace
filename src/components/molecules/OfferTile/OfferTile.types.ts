import type { ComponentPropsWithoutRef } from 'react'
import type { IconType } from 'react-icons'

export interface OfferTileProps extends ComponentPropsWithoutRef<'div'> {
  href: string
  icon: IconType
  label: string
  description: string
  location: string
  price: number
  thumbnailSrc: string
  properties: string[]
  orientation?: 'horizontal' | 'vertical'
  onLikeButtonClick: () => void
}
