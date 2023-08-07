import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

export interface TextCarouselProps extends ComponentPropsWithoutRef<'span'> {
  texts: string[]
  stopTime?: number
}
