import React from 'react'
import styles from './Chip.module.css'
import type { ChipProps } from '@/components/atoms/Chip/Chip.types'
import clsx from 'clsx'

export const Chip = (props: ChipProps) => {
  const { children, className = '', ...restProps } = props

  return (
    <span
      className={clsx(className, styles.container)}
      {...restProps}
    >
      {children}
    </span>
  )
}
