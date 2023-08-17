import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface TimedCarouselProps extends ComponentPropsWithoutRef<'span'> {
  items: ReactNode[]
  time?: number
}
