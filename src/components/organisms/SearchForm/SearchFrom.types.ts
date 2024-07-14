import type {
  ComponentPropsWithoutRef,
  FormEvent,
  PropsWithChildren,
  ReactNode,
} from 'react'
import type { ZodSchema } from 'zod'

export type ChildrenWithClassNameProps<C = ReactNode> = {
  children: C
  className?: string
}

export interface SearchFormProps
  extends ComponentPropsWithoutRef<'form'>,
    PropsWithChildren {
  schema: ZodSchema
}
