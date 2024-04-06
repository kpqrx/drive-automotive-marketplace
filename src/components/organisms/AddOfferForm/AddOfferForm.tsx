'use client'
import styles from './AddOfferForm.module.css'
import type {
  AddOfferFormFieldsetProps,
  AddOfferFormProps,
  CreateAddFormStepsFn,
} from '@/components/organisms/AddOfferForm/AddOfferForm.types'
import { Container, Input, Stepper } from '@/components'
import clsx from 'clsx'
import type { StepperStepChangeCallback } from '@/components/molecules/Stepper/Stepper.types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addOfferFormSchema, type AddOfferFormSchemaType } from '@/schemas'
import { mergeEventHandlers, mergeRefs } from '@/utils'

type FormComponentType = typeof Input

const AddOfferFormFieldset = (
  props: AddOfferFormFieldsetProps<FormComponentType, AddOfferFormSchemaType>,
) => {
  const { label, fields, errors, register } = props
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.label}>{label}</legend>
      {fields.map((field, i) => {
        const { name, props, component, registerOptions } = field
        const Component = component ?? Input
        const error = errors[name]?.message

        const {
          onChange: registerOnChange,
          onBlur: registerOnBlur,
          ref: registerRef,
          ...restRegisterProps
        } = register(name, registerOptions)
        const { onChange, onBlur, ref, ...restProps } = props

        const componentProps = {
          error,
          onChange: mergeEventHandlers(onChange, registerOnChange),
          onBlur: mergeEventHandlers(onBlur, registerOnBlur),
          ref: mergeRefs(ref, registerRef),
          ...restRegisterProps,
          ...restProps,
        }

        return (
          <Component
            key={i}
            {...componentProps}
          />
        )
      })}
    </fieldset>
  )
}

const createSteps: CreateAddFormStepsFn<AddOfferFormSchemaType> = (
  register,
  errors,
) => [
  {
    label: 'O pojeździe',
    description: 'Podaj informacje o pojeździe',
    content: () => (
      <AddOfferFormFieldset
        label="Informacje podstawowe"
        register={register}
        errors={errors}
        fields={[
          {
            name: 'make',
            props: { label: 'Marka' },
          },
          { name: 'model', props: { label: 'Model' } },
          { name: 'title', props: { label: 'Tytuł' } },
          {
            name: 'price',
            props: { label: 'Cena' },
            registerOptions: {
              setValueAs: (value: any) =>
                value ? parseInt(value, 10) : undefined,
            },
          },
        ]}
      />
    ),
  },
  {
    label: 'Opis i zdjęcia',
    description: 'Załącz opis i zdjęcia',
    content: () => (
      <AddOfferFormFieldset
        label="Opis i zdjęcia"
        register={register}
        errors={errors}
        fields={[
          { name: 'description', props: { label: 'Opis ogłoszenia' } }, // TODO: Implement RichTextEditor component
          {
            name: 'photos',
            props: { label: 'Zdjęcia', type: 'file', multiple: true },
          }, // TODO: Implement FileInput component
        ]}
      />
    ),
  },
  {
    label: 'Płatność',
    description: 'Dokonaj płatności za ogłoszenie',
    content: () => <div>Płatności here</div>,
  },
]

export const AddOfferForm = (props: AddOfferFormProps) => {
  const { className, ...restProps } = props

  const {
    trigger,
    register,
    formState: { errors },
  } = useForm<AddOfferFormSchemaType>({
    resolver: zodResolver(addOfferFormSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  })

  const handleNextStep: StepperStepChangeCallback = async ({ currentStep }) => {
    switch (currentStep) {
      case 0:
        return trigger(['make', 'model', 'title', 'price'])
      case 1:
        return trigger(['description', 'photos'])
      case 2:
        // TODO: Add payment validation
        break
    }

    return Promise.resolve(true)
  }

  return (
    <Stepper
      className={clsx(styles.container, className)}
      nextButtonLabel="Następny krok"
      previousButtonLabel="Poprzedni krok"
      steps={createSteps(register, errors)}
      onNextStep={handleNextStep}
      hasGuardedSteps={false}
      {...restProps}
    >
      <Container
        className={clsx(styles.wrapper, styles.timeline)}
        as="nav"
      >
        <Stepper.Timeline />
      </Container>
      <Container
        as="form"
        className={styles.content}
      >
        <Stepper.Content />
      </Container>
      <Container
        className={clsx(styles.wrapper, styles.footer)}
        as="footer"
      >
        <Stepper.Footer />
      </Container>
    </Stepper>
  )
}
