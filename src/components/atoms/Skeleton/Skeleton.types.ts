import type { ComponentPropsWithoutRef } from 'react'

export interface SkeletonProps extends ComponentPropsWithoutRef<'span'> {
  count?: number
}
