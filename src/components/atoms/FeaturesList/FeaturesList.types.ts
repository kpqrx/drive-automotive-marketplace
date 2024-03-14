import type { HTMLAttributes, ComponentPropsWithoutRef, ReactNode } from 'react'

export type FeaturesListItem = {
  label: string
  value: string
  icon: (args: HTMLAttributes<SVGSVGElement>) => ReactNode
}

export type FeaturesListProps = (
  | {
      variant?: 'grouped'
      items: {
        label: string
        items: FeaturesListItem[]
      }[]
    }
  | {
      variant?: 'base'
      items: FeaturesListItem[]
    }
) &
  ComponentPropsWithoutRef<'ul'>
