import type { ReactNode } from 'react'

export interface ContainerProps<T extends keyof JSX.IntrinsicElements> {
  as?: T
  children: ReactNode
  className?: string
}
