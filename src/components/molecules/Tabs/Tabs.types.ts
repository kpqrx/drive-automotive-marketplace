import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type TabItemType = {
  label: ReactNode
  content: ReactNode
}

export interface TabsProps {
  defaultActive?: number
  items: TabItemType[]
}
