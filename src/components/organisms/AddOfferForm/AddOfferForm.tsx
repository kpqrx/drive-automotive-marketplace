'use client'
import styles from './AddOfferForm.module.css'
import type {
  AddOfferFormFieldsetProps,
  AddOfferFormProps,
  CreateAddFormStepsFn,
} from '@/components/organisms/AddOfferForm/AddOfferForm.types'
import { Container, Input, Stepper, FileInput, TextEditor } from '@/components'
import clsx from 'clsx'
import type { StepperStepChangeCallback } from '@/components/molecules/Stepper/Stepper.types'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addOfferFormSchema, type AddOfferFormSchemaType } from '@/schemas'
import { mergeEventHandlers, mergeRefs } from '@/utils'
import { PhotoIcon } from '@heroicons/react/24/outline'

type FormComponentType = typeof Input | typeof FileInput | typeof TextEditor

const AddOfferFormFieldset = (
  props: AddOfferFormFieldsetProps<FormComponentType, AddOfferFormSchemaType>,
) => {
  const { label, fields, errors, register } = props
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.label}>{label}</legend>
      {fields.map((field, i) => {
        const { name, props, component, registerOptions } = field
        // TODO: Fix type checking
        const Component = component ?? (Input as any)
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
          {
            name: 'description',
            component: TextEditor,
            props: { label: 'Opis ogłoszenia' },
          },
          {
            name: 'photos',
            component: FileInput,
            props: {
              label: 'Zdjęcia',
              icon: PhotoIcon,
              placeholderHeading: 'Dodaj zdjęcia',
              placeholderDescription: 'Kliknij lub przeciągnij i upuść',
              dragPlaceholderDescription: 'Upuść zdjęcia',
            },
          },
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

  const formMethods = useForm<AddOfferFormSchemaType>({
    resolver: zodResolver(addOfferFormSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  })
  const {
    trigger,
    register,
    formState: { errors },
  } = formMethods

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
      <div className={styles.wrapper}>
        <Container
          className={styles.timeline}
          as="nav"
        >
          <Stepper.Timeline />
        </Container>
      </div>
      <FormProvider {...formMethods}>
        <Container
          as="form"
          className={styles.content}
        >
          <Stepper.Content />
        </Container>
      </FormProvider>
      <div className={styles.wrapper}>
        <Container
          className={styles.footer}
          as="footer"
        >
          <Stepper.Footer />
        </Container>
      </div>
    </Stepper>
  )
}
