import type { OfferParameterKey, OfferParameters } from '@/types'
import type { Dispatch, SetStateAction } from 'react'
export interface FiltersMenuProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
  onSubmit: (data: OfferParameters) => void
}

export interface FiltersMenuItemProps {
  children: React.ReactNode
  name: OfferParameterKey
  label: string
}
