import type { MotionProps } from 'framer-motion'
import type { Dispatch, SetStateAction } from 'react'

export type SidebarItemType = {
  label: string
  href: string
}

export interface SidebarProps extends MotionProps {
  className?: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  items: SidebarItemType[]
}
