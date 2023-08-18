import type { Dispatch, SetStateAction } from 'react'

export interface FiltersMenuProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
