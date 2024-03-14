'use client'
import clsx from 'clsx'
import type { ScrollGalleryProps } from './ScrollGallery.types'
import styles from './ScrollGallery.module.css'
import Image from 'next/image'
import {
  m,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { useBoundingRect } from '@/hooks'
import type { CSSProperties } from 'react'

export const ScrollGallery = (props: ScrollGalleryProps) => {
  const { items, className = '', ...restProps } = props

  const { ref: galleryRef, rect: galleryRect } =
    useBoundingRect<HTMLDivElement>()
  const { scrollYProgress: xAxisProgress } = useScroll({
    target: galleryRef,
    offset: ['0 0', '1 0.5'],
  })
  const { scrollYProgress: yAxisProgress } = useScroll({
    target: galleryRef,
    offset: [`-${galleryRect.y}px 0`, '0 0'] as any, // TODO: fix types
  })
  const velocity = useVelocity(xAxisProgress)
  const velocitySpring = useSpring(velocity, { mass: 0.1 })
  const xAxisProgressSpring = useSpring(xAxisProgress, { mass: 0.1 })

  const x = useTransform(xAxisProgressSpring, [0, 1], ['0%', '-100%'])
  const y = useTransform(yAxisProgress, [0, 0.75], ['0%', '-50%'])
  const skew = useTransform(velocitySpring, [0, 0.25, 0], [0, -3, 0], {
    clamp: false,
  })
  const scale = useTransform(yAxisProgress, [0, 0.75], [0.85, 1])

  return (
    <div
      ref={galleryRef}
      style={{ '--itemsCount': items.length } as CSSProperties}
      className={clsx(className, styles.container)}
      {...restProps}
    >
      <m.ul
        className={styles.wrapper}
        style={{ x, skew, y, scale }}
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
    </div>
  )
}
