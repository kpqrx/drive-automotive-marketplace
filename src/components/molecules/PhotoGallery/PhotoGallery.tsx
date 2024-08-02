'use client'
import clsx from 'clsx'
import type { PhotoGalleryProps } from './PhotoGallery.types'
import styles from './PhotoGallery.module.css'
import Image from 'next/image'
import {
  m,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  clamp,
  type MotionStyle,
} from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components'

export const PhotoGallery = (props: PhotoGalleryProps) => {
  const { items, className = '', ...restProps } = props

  const galleryRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: yAxisProgress } = useScroll({
    target: galleryRef,
    offset: ['start end', 'end end'],
  })
  const { scrollYProgress: panelYAxisProgress } = useScroll({
    target: galleryRef,
    offset: ['center end', 'end end'],
  })

  const [imageOffsets, setImageOffsets] = useState<number[]>([])

  useEffect(() => {
    if (!galleryRef.current) {
      return
    }

    const handleOffsetsMeasurement = (target: Element) => {
      const offsets = [...target.querySelectorAll('img')].map(
        (element, index) => {
          if (index === 0) return 0
          const { x, width } = element.getBoundingClientRect()
          return x - (window.innerWidth - width) / 2
        },
      )
      setImageOffsets(offsets)
    }

    handleOffsetsMeasurement(galleryRef.current)

    const resize = new ResizeObserver(([entry]) =>
      handleOffsetsMeasurement(entry.target),
    )
    resize.observe(galleryRef.current)
    return () => resize.disconnect()
  }, [])

  const currentImageIndex = useMotionValue(0)
  const mappedOffset = useTransform(
    currentImageIndex,
    (index) => (imageOffsets.at(index) ?? 0) * -1,
  )
  const x = useSpring(mappedOffset, { mass: 0.12 })
  const panelY = useTransform(panelYAxisProgress, [0, 1], ['100%', '0%'])

  return (
    <div
      ref={galleryRef}
      className={clsx(className, styles.container)}
      {...restProps}
    >
      <m.ul
        className={styles.imagesWrapper}
        initial={false}
        style={
          {
            x,
            '--currentOffset': x,
          } as MotionStyle
        }
      >
        {items.map(({ width, height, src, alt }, index) => {
          return (
            <li
              key={index}
              className={styles.item}
            >
              <Image
                width={width}
                height={height}
                src={src}
                alt={alt}
                className={styles.image}
              />
            </li>
          )
        })}
      </m.ul>
      <m.div
        style={{ y: panelY }}
        className={styles.panelWrapper}
      >
        <Button
          onClick={() =>
            currentImageIndex.set(
              clamp(0, items.length - 1, currentImageIndex.get() - 1),
            )
          }
        >
          Poprzednie
        </Button>
        <Button
          onClick={() =>
            currentImageIndex.set(
              clamp(0, items.length - 1, currentImageIndex.get() + 1),
            )
          }
        >
          Następne
        </Button>
      </m.div>
    </div>
  )
}
