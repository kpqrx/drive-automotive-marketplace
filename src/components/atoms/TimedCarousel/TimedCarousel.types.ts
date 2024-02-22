import type { HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

export interface TimedCarouselProps extends HTMLMotionProps<'span'> {
  items: ReactNode[]
  time?: number
}
