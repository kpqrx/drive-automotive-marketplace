import React, { type PropsWithChildren } from 'react'
import styles from './Container.module.css'
import clsx from 'clsx'
import type { ContainerProps } from '@/components/atoms/Container/Container.types'

export const Container = (props: ContainerProps) => {
  const { children, className = '', ...restProps } = props

  return (
    <div
      className={clsx(styles.container, className)}
      data-testid="Container"
      {...restProps}
    >
      {children}
    </div>
  )
}
