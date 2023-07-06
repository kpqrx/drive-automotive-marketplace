import React from 'react'
import styles from './Button.module.css'
import type { ButtonProps } from '@/components/atoms/Button/Button.types'
import clsx from 'clsx'

export const Button = (props: ButtonProps) => {
  const { variant = 'primary', size = 'large', children, ...restProps } = props

  return (
    <button
      type="button"
      className={clsx(styles.container, [
        variant === 'primary' && styles.containerPrimary,
        variant === 'secondary' && styles.containerSecondary,
        size === 'large' && styles.containerLarge,
        size === 'small' && styles.containerSmall,
      ])}
      {...restProps}
    >
      {children}
    </button>
  )
}
