import type {
  StepperProps,
  StepperStep,
} from '@/components/molecules/Stepper/Stepper.types'
import type { ComponentProps, JSXElementConstructor } from 'react'
import type {
  FieldValues,
  FieldErrors,
  Control,
  FormState,
} from 'react-hook-form'

export interface AddOfferFormProps extends Omit<StepperProps, 'steps'> {}

export type CreateAddFormStepsFn<T extends FieldValues> = (
  control: Control<T>,
  errors: FieldErrors<T>,
  suggestions?: Record<string, { label: string; value: string }[]>,
) => StepperStep[]

export type AddOfferFormFieldType<
  C extends JSXElementConstructor<any>,
  V extends FieldValues,
> = {
  name: keyof V
  props: ComponentProps<C>
  component?: C
  options?: {
    isNumber?: boolean
    disabledName?: string
  }
}
export interface AddOfferFormFieldsetProps<
  C extends JSXElementConstructor<any>,
  V extends FieldValues,
> {
  label: string
  errors: FieldErrors<V>
  control: Control<V>
  fields: AddOfferFormFieldType<C, V>[]
}
