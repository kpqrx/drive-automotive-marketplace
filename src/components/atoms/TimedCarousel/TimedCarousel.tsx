'use client'

import type { TimedCarouselProps } from '@/components/atoms/TimedCarousel/TimedCarousel.types'
import { useInterval } from '@/hooks'
import clsx from 'clsx'
import { m, AnimatePresence, wrap, useMotionValue } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import styles from './TimedCarousel.module.css'

export const TimedCarousel = (props: TimedCarouselProps) => {
  const { items, time = 4000, className = '', ...restProps } = props
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemRef = useRef<HTMLSpanElement>(null)
  const currentWidth = useMotionValue<string | number>('auto')

  useInterval(() => {
    setCurrentIndex((previousIndex) => wrap(0, items.length, ++previousIndex))
  }, time)

  useLayoutEffect(() => {
    if (!itemRef.current) {
      return
    }
    const { width } = itemRef.current.getBoundingClientRect()
    currentWidth.set(width)
  }, [currentIndex, currentWidth])

  return (
    <m.span
      style={{ width: currentWidth }}
      className={clsx(className, styles.container)}
      data-testid="TimedCarousel"
      {...restProps}
    >
      {items.map((item, i) => (
        <AnimatePresence
          mode="wait"
          initial={false}
          key={`${item}-${i}`}
        >
          {currentIndex === i && (
            <m.span
              ref={itemRef}
              className={styles.item}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
            >
              {item}
            </m.span>
          )}
        </AnimatePresence>
      ))}
    </m.span>
  )
}
