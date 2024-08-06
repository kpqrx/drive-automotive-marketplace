import type { ComponentPropsWithoutRef } from 'react'
import type { IconType } from 'react-icons'

export interface OfferTileProps extends ComponentPropsWithoutRef<'a'> {
  href: string
  icon: IconType
  label: string
  title?: string
  location: string
  price: number
  thumbnailSrc: string
  properties: string[]
  orientation?: 'horizontal' | 'vertical'
  onLikeButtonClick?: () => void
  onDeleteButtonClick?: () => void
  withDeleteButton?: boolean
  withLikeButton?: boolean
  isLiked?: boolean
}
