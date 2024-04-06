import type {
  StepperProps,
  StepperStep,
} from '@/components/molecules/Stepper/Stepper.types'
import type { ComponentProps, FC, JSXElementConstructor } from 'react'
import type {
  FieldValues,
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'

export interface AddOfferFormProps extends Omit<StepperProps, 'steps'> {}

export type CreateAddFormStepsFn<T extends FieldValues> = (
  register: UseFormRegister<T>,
  errors: FieldErrors<T>,
) => StepperStep[]

export type AddOfferFormFieldType<
  C extends JSXElementConstructor<any>,
  V extends FieldValues,
> = {
  name: keyof V
  props: ComponentProps<C>
  component?: C
  registerOptions?: RegisterOptions
}
export interface AddOfferFormFieldsetProps<
  C extends JSXElementConstructor<any>,
  V extends FieldValues,
> {
  label: string
  errors: FieldErrors<V>
  register: UseFormRegister<V>
  fields: AddOfferFormFieldType<C, V>[]
}
