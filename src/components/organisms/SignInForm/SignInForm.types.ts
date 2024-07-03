import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

export interface SignInFormProps
  extends ComponentPropsWithoutRef<'form'>,
    PropsWithChildren {
  onSubmit?: () => void
}
