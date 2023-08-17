'use client'

import { useState } from 'react'
import { motion, AnimatePresence, wrap } from 'framer-motion'
import styles from './TimedCarousel.module.css'
import type { TimedCarouselProps } from '@/components/atoms/TimedCarousel/TimedCarousel.types'
import clsx from 'clsx'
import { useInterval } from '@/hooks'

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
            <motion.span
              className={styles.item}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              custom={currentIndex}
            >
              {item}
            </motion.span>
          )}
        </AnimatePresence>
      ))}
    </span>
  )
}
