import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

export interface SignUpFormProps
  extends Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>,
    PropsWithChildren {}
