import type { Dispatch, ReactNode, SetStateAction } from 'react'

export type FiltersMenuItemType = {
  id: number
  title: string
  content: ReactNode
  value?:
    | number
    | string
    | boolean
    | number[]
    | string[]
    | boolean[]
    | [number, number]
}
export interface FiltersMenuProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  items?: FiltersMenuItemType[]
}
