import React from 'react'
import styles from './Skeleton.module.css'
import type { SkeletonProps } from '@/components/atoms/Skeleton/Skeleton.types'
import clsx from 'clsx'

export const Skeleton = (props: SkeletonProps) => {
  const { className = '', count = 1, ...restProps } = props

  return (
    <div
      className={clsx(styles.container, className)}
      {...restProps}
    >
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className={styles.item}
        />
      ))}
    </div>
  )
}
