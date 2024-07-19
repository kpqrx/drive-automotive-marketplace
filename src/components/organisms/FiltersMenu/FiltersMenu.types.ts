import type {
  OfferFilteringFormSchema,
  OfferFilteringFormSchemaKey,
} from '@/schemas'
import type { Dispatch, SetStateAction } from 'react'
import type { UseFormRegister, UseFormReturn } from 'react-hook-form'
export interface FiltersMenuProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}

export interface FiltersMenuItemProps {
  children: (
    renderProps: UseFormReturn<OfferFilteringFormSchema>,
  ) => React.ReactNode
  name: OfferFilteringFormSchemaKey
  label: string
}
