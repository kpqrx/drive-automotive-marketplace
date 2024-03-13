import type {
  ComponentPropsWithoutRef,
  FormEvent,
  PropsWithChildren,
  ReactNode,
} from 'react'

export type ChildrenWithClassNameProps<C = ReactNode> = {
  children: C
  className?: string
}

export interface SearchFormProps
  extends ComponentPropsWithoutRef<'form'>,
    PropsWithChildren {
  onSubmit: () => void
}

export type SearchFormContextType = {
  handleSubmit: (e: FormEvent) => void
}
