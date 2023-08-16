import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

export interface BreadcrumbsProps extends ComponentPropsWithoutRef<'ul'> {
  items: { label: string; path: string }[]
  isLastItemHighlighted?: boolean
}
