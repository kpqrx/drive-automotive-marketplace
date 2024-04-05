import styles from './Container.module.css'
import clsx from 'clsx'
import type { ContainerProps } from '@/components/atoms/Container/Container.types'
import { forwardRef } from 'react'

export const Container = forwardRef<HTMLElement, ContainerProps<any>>(
  (props, ref) => {
    const { children, className = '', as: Tag = 'div', ...restProps } = props

    return (
      <Tag
        className={clsx(styles.container, className)}
        data-testid="Container"
        ref={ref}
        {...restProps}
      >
        <div className={styles.wrapper}>{children}</div>
      </Tag>
    )
  },
)

Container.displayName = 'Container'
