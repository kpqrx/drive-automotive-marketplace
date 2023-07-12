import type { MotionProps } from 'framer-motion'
import type { ComponentProps, Dispatch, SetStateAction } from 'react'
import type { IconType } from 'react-icons'

export type SidebarItemType = {
  icon: IconType
  label: string
  href: string
}

export interface SidebarProps extends MotionProps {
  className?: string
  stateSetter: Dispatch<SetStateAction<boolean>>
  items: SidebarItemType[]
}
