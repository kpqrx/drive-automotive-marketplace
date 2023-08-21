'use client'

import type { TimedCarouselProps } from '@/components/atoms/TimedCarousel/TimedCarousel.types'
import { useInterval } from '@/hooks'
import clsx from 'clsx'
import { m, AnimatePresence, wrap } from 'framer-motion'
import { useState } from 'react'
import styles from './TimedCarousel.module.css'

export const TimedCarousel = (props: TimedCarouselProps) => {
  const { items, time = 4000, className = '', ...restProps } = props
  const [currentIndex, setCurrentIndex] = useState(0)

  useInterval(() => {
    setCurrentIndex((previousIndex) => wrap(0, items.length, ++previousIndex))
  }, time)

  return (
    <span
      className={clsx(className, styles.container)}
      data-testid="TimedCarousel"
      {...restProps}
    >
      {items.map((item, i) => (
        <AnimatePresence
          mode="wait"
          initial={false}
          custom={currentIndex}
          key={i}
        >
          {currentIndex === i && (
            <m.span
              className={styles.item}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              custom={currentIndex}
            >
              {item}
            </m.span>
          )}
        </AnimatePresence>
      ))}
    </span>
  )
}
