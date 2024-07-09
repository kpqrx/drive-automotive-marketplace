import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

export interface SignInFormProps
  extends Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>,
    PropsWithChildren {}
