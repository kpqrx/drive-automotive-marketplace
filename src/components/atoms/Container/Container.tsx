import styles from './Container.module.css'
import clsx from 'clsx'
import type { ContainerProps } from '@/components/atoms/Container/Container.types'
import { forwardRef, type ElementType } from 'react'

// TODO: Move to a separate file
export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref']

export const Container = forwardRef(
  <C extends ElementType>(props: ContainerProps<C>, ref: PolymorphicRef<C>) => {
    const { children, className = '', as: Tag = 'div', ...restProps } = props

    return (
      <Tag
        className={clsx(styles.container, className)}
        data-testid="Container"
        ref={ref}
        {...restProps}
      >
        {children}
      </Tag>
    )
  },
)

Container.displayName = 'Container'
