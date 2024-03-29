import type { ComponentPropsWithoutRef } from 'react'

export type PhotoGalleryItem = {
  width: number
  height: number
  src: string
  alt: string
}

export interface PhotoGalleryProps extends ComponentPropsWithoutRef<'div'> {
  items: PhotoGalleryItem[]
}
