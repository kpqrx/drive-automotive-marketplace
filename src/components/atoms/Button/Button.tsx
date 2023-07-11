import React from 'react'
import styles from './Button.module.css'
import type { ButtonProps } from '@/components/atoms/Button/Button.types'
import clsx from 'clsx'
import Link from 'next/link'

export const Button = (props: ButtonProps) => {
  const {
    variant = 'primary',
    size = 'large',
    children,
    className = '',
    href,
    ...restProps
  } = props

  const Component = href ? Link : 'button'

  return (
    <Component
      href={href as string}
      type={href ? undefined : 'button'}
      className={clsx(className, styles.container, [
        variant === 'primary' && styles.containerPrimary,
        variant === 'secondary' && styles.containerSecondary,
        size === 'large' && styles.containerLarge,
        size === 'small' && styles.containerSmall,
      ])}
      {...restProps}
    >
      {children}
    </Component>
  )
}
