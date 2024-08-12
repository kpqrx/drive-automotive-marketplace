// @ts-nocheck
'use client'
import styles from './AddOfferForm.module.css'
import type {
  AddOfferFormFieldsetProps,
  AddOfferFormProps,
  CreateAddFormStepsFn,
} from '@/components/organisms/AddOfferForm/AddOfferForm.types'
import {
  Container,
  Input,
  Stepper,
  FileInput,
  TextEditor,
  Select,
  CheckboxGroup,
} from '@/components'
import clsx from 'clsx'
import type { StepperStepChangeCallback } from '@/components/molecules/Stepper/Stepper.types'
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addOfferFormSchema, type AddOfferFormSchemaType } from '@/schemas'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { useOfferParametersSuggestions, useToast } from '@/hooks'
import { addOffer } from '@/lib'
import { getOfferFormData } from '@/utils'
import { useRouter } from 'next/navigation'
import { PaymentForm } from '../PaymentForm/PaymentForm'

type FormComponentType = typeof Input | typeof FileInput | typeof TextEditor

const AddOfferFormFieldset = (
  props: AddOfferFormFieldsetProps<FormComponentType, AddOfferFormSchemaType>,
) => {
  const { label, fields, errors, control } = props
  const { watch } = useFormContext()
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.label}>{label}</legend>
      {fields.map((field) => {
        const { name, props, component, options } = field
        const Component = component ?? (Input as any)
        const error = errors[name]?.message

        const { onChange, onBlur, ref, ...restProps } = props

        return (
          <Controller
            key={name}
            control={control}
            name={name}
            render={({ field }) => (
              <Component
                name={name}
                onValueChange={(fieldValue) => {
                  const value = options?.isNumber
                    ? parseInt(fieldValue, 10)
                    : fieldValue
                  field.onChange({
                    target: {
                      value,
                    },
                  })
                  if (props.onValueChange) props.onValueChange(value)
                }}
                defaultValue={field.value}
                error={error}
                disabled={!watch(options?.disabledName && options.disabledName)}
                {...restProps}
              />
            )}
          />
        )
      })}
    </fieldset>
  )
}

const createSteps: CreateAddFormStepsFn<AddOfferFormSchemaType> = (
  control,
  errors,
  suggestions,
) => [
  {
    label: 'O pojeździe',
    description: 'Podaj informacje o pojeździe',
    content: () => (
      <>
        <AddOfferFormFieldset
          label="Informacje podstawowe"
          control={control}
          errors={errors}
          fields={[
            {
              name: 'brand',
              component: Select,
              props: {
                label: 'Marka',
                placeholder: 'Wybierz markę',
                items: suggestions?.brands.data ?? [],
              },
            },
            {
              name: 'model',
              component: Select,
              props: {
                label: 'Model',
                placeholder: 'Wybierz model',
                items: suggestions?.models.data ?? [],
              },
              options: {
                disabledName: 'brand',
              },
            },
            {
              name: 'price',
              props: { label: 'Cena', placeholder: 'Podaj cenę' },
              options: {
                isNumber: true,
              },
            },
            {
              name: 'prodYear',
              component: Select,
              props: {
                label: 'Rok produkcji',
                placeholder: 'Podaj rok produkcji',
                items: suggestions?.prodYears.data ?? [],
              },
              options: {
                isNumber: true,
              },
            },
            {
              name: 'title',
              props: {
                label: 'Tytuł',
                placeholder: 'Krótko opisz Twoją ofertę (opcjonalne)',
              },
            },
          ]}
        />
        <AddOfferFormFieldset
          label="Dane techniczne"
          control={control}
          errors={errors}
          fields={[
            {
              name: 'engine',
              props: {
                label: 'Pojemność silnika',
                placeholder: 'Podaj pojemność silnika',
              },
              options: {
                isNumber: true,
              },
            },
            {
              name: 'power',
              props: { label: 'Moc silnika', placeholder: 'Podaj moc silnika' },
              options: {
                isNumber: true,
              },
            },
            {
              name: 'mileage',
              props: { label: 'Przebieg', placeholder: 'Podaj przebieg' },
              options: {
                isNumber: true,
              },
            },
            {
              name: 'fuelType',
              component: Select,
              props: {
                label: 'Rodzaj paliwa',
                placeholder: 'Wybierz rodzaj paliwa',
                items: suggestions?.fuelTypes.data ?? [],
              },
            },
            {
              name: 'bodyType',
              component: Select,
              props: {
                label: 'Rodzaj nadwozia',
                placeholder: 'Wybierz rodzaj nadwozia',
                items: suggestions?.bodyTypes.data ?? [],
              },
            },
          ]}
        />
        <fieldset className={clsx(styles.fieldset, 'overflow-hidden')}>
          <legend className={styles.label}>Wyposażenie</legend>
          <CheckboxGroup
            name="multimediaFeatures"
            items={suggestions?.multimediaFeatures.data ?? []}
            control={control}
            error={errors.multimediaFeatures}
          >
            <span className="mb-2 block">Wyposażenie multimedialne</span>
          </CheckboxGroup>
          <CheckboxGroup
            name="safetyFeatures"
            items={suggestions?.safetyFeatures.data ?? []}
            control={control}
            error={errors.safetyFeatures}
          >
            <span className="mb-2 block">Wyposażenie bezpieczeństwa</span>
          </CheckboxGroup>
          <CheckboxGroup
            name="driverAssistanceFeatures"
            items={suggestions?.driverAssistanceFeatures.data ?? []}
            control={control}
            error={errors.driverAssistanceFeatures}
          >
            <span className="mb-2 block">
              Wyposażenie wspomagające kierowcę
            </span>
          </CheckboxGroup>
          <CheckboxGroup
            name="performanceFeatures"
            items={suggestions?.performanceFeatures.data ?? []}
            control={control}
            error={errors.performanceFeatures}
          >
            <span className="mb-2 block">Wyposażenie sportowe</span>
          </CheckboxGroup>
          <CheckboxGroup
            name="otherFeatures"
            items={suggestions?.otherFeatures.data ?? []}
            control={control}
            error={errors.otherFeatures}
          >
            <span className="mb-2 block">Wyposażenie niestandardowe</span>
          </CheckboxGroup>
        </fieldset>
      </>
    ),
  },
  {
    label: 'Opis i zdjęcia',
    description: 'Załącz opis i zdjęcia',
    content: () => (
      <AddOfferFormFieldset
        label="Opis i zdjęcia"
        control={control}
        errors={errors}
        fields={[
          {
            name: 'description',
            component: TextEditor,
            props: {
              label: 'Opis ogłoszenia',
              placeholder: 'Opisz swój pojazd',
            },
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
    content: ({ onLastStep, setPreviousStep }) => (
      <PaymentForm
        onPaymentSuccess={onLastStep}
        goToPreviousStep={setPreviousStep}
      />
    ),
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
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = formMethods

  const { toast } = useToast()
  const { replace } = useRouter()

  const handleNextStep: StepperStepChangeCallback = async ({ currentStep }) => {
    switch (currentStep) {
      case 0:
        return trigger([
          'brand',
          'model',
          'title',
          'price',
          'bodyType',
          'fuelType',
          'prodYear',
          'mileage',
          'power',
          'engine',
          'multimediaFeatures',
          'safetyFeatures',
          'otherFeatures',
          'driverAssistanceFeatures',
          'performanceFeatures',
        ])
      case 1:
        return trigger(['description', 'photos'])
      case 2:
        // TODO: Add payment validation
        break
    }

    return Promise.resolve(true)
  }

  const suggestions = useOfferParametersSuggestions({
    modelsQuery: watch('brand'),
  })

  return (
    <Stepper
      className={clsx(styles.container, className)}
      nextButtonLabel="Następny krok"
      previousButtonLabel="Poprzedni krok"
      finalButtonLabel="Dodaj ogłoszenie"
      steps={createSteps(control, errors, suggestions)}
      onNextStep={handleNextStep}
      hideFooterOnLastStep
      onLastStep={handleSubmit(async (data) => {
        const formData = getOfferFormData(data)

        try {
          await addOffer(formData)
          replace('/offers/add-success')
        } catch (error) {
          toast({
            title: 'Nie udało się dodać oferty',
            description: 'Spróbuj ponownie później',
            status: 'error',
          })
        }
      })}
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
      <div className={clsx(styles.wrapper, '!bg-transparent')}>
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
