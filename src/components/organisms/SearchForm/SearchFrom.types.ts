import type {
  ComponentPropsWithoutRef,
  Dispatch,
  FormEvent,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
} from 'react'

export type ChildrenWithClassNameProps<C = ReactNode> = {
  children: C
  className?: string
}

export interface SearchFormProps
  extends ComponentPropsWithoutRef<'form'>,
    PropsWithChildren {
  onSubmit: () => void
  advancedFields: () => ReactNode
}

export type SearchFormContextType = {
  setAdvancedModeActive: Dispatch<SetStateAction<boolean>>
  handleSubmit: (e: FormEvent) => void
}
