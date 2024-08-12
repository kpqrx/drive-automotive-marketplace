import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

export interface PaymentFormProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onSubmit'>,
    PropsWithChildren {
  onPaymentSuccess: () => Promise<void>
  goToPreviousStep: () => void
}
