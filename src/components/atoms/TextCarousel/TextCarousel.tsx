'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './TextCarousel.module.css'
import type { TextCarouselProps } from '@/components/atoms/TextCarousel/TextCarousel.types'
import clsx from 'clsx'

export const TextCarousel = (props: TextCarouselProps) => {
  const { texts, stopTime = 4000, className = '', ...restProps } = props
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const x = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, stopTime)

    return () => clearInterval(x)
  }, [texts, stopTime])

  return (
    <span
      className={clsx(className, styles.container)}
      data-testid="TextCarousel"
      {...restProps}
    >
      <AnimatePresence
        mode="popLayout"
        initial={false}
      >
        {texts.map(
          (text, i) =>
            i === activeIndex && (
              <motion.span
                className={styles.text}
                key={`${text}_${i}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
              >
                {text}
              </motion.span>
            ),
        )}
      </AnimatePresence>
    </span>
  )
}
