import type {
  StepperProps,
  StepperStep,
} from '@/components/molecules/Stepper/Stepper.types'
import type { FieldValues, UseFormRegister, FieldErrors } from 'react-hook-form'

export interface AddOfferFormProps extends Omit<StepperProps, 'steps'> {}

export type CreateAddFormStepsFn<T extends FieldValues> = (
  register: UseFormRegister<T>,
  errors: FieldErrors<T>,
) => StepperStep[]
