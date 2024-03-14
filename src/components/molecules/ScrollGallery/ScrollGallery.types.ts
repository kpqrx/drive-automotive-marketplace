import type { ComponentPropsWithoutRef } from 'react'

export type ScrollGalleryItem = {
  width: number
  height: number
  src: string
  alt: string
}

export interface ScrollGalleryProps extends ComponentPropsWithoutRef<'div'> {
  items: ScrollGalleryItem[]
}
