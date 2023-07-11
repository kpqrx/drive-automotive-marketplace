import type { ComponentPropsWithoutRef, Dispatch, SetStateAction } from 'react'
import type { IconType } from 'react-icons'

export type SidebarItemType = {
  icon: IconType
  label: string
  href: string
}

export interface SidebarProps extends ComponentPropsWithoutRef<'aside'> {
  stateSetter: Dispatch<SetStateAction<boolean>>
  items: SidebarItemType[]
}
