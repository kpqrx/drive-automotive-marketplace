import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

export interface SignUpFormProps
  extends ComponentPropsWithoutRef<'form'>,
    PropsWithChildren {
  onSubmit?: () => void
}
