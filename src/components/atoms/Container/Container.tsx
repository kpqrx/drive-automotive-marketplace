import styles from './Container.module.css'
import clsx from 'clsx'
import type { ContainerProps } from '@/components/atoms/Container/Container.types'

export const Container = (props: ContainerProps<any>) => {
  const { children, className = '', as: Tag = 'div', ...restProps } = props

  return (
    <Tag
      className={clsx(styles.container, className)}
      data-testid="Container"
      {...restProps}
    >
      {children}
    </Tag>
  )
}
