import type { ReactNode } from 'react'

export type TabItemType = {
  label: ReactNode
  content: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  /**
   * Defines index of the default item listed in `items` array.
   * @type Number
   * @default 0
   */
  defaultItem?: number
  /**
   * Collection of items displayed in tabs.
   * Each item should be an object have `label` and `content` properties.
   * @type TabItemType[]
   * @
   */
  items: TabItemType[]
}

export enum TabsDirection {
  Left = -1,
  Right = 1,
}
