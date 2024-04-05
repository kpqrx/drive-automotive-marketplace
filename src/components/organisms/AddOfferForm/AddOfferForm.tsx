'use client'
import styles from './AddOfferForm.module.css'
import type {
  AddOfferFormProps,
  CreateAddFormStepsFn,
} from '@/components/organisms/AddOfferForm/AddOfferForm.types'
import { Container, Input, Stepper } from '@/components'
import clsx from 'clsx'
import type { StepperStepChangeCallback } from '@/components/molecules/Stepper/Stepper.types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addOfferFormSchema, type AddOfferFormSchemaType } from '@/schemas'

const createSteps: CreateAddFormStepsFn<AddOfferFormSchemaType> = (
  register,
  errors,
) => [
  {
    label: 'O pojeździe',
    description: 'Podaj informacje o pojeździe',
    content: () => (
      <fieldset className="flex flex-col space-y-4">
        <Input
          label="Marka"
          {...register('make')}
          error={errors.make?.message}
        />
        <Input
          label="Model"
          {...register('model')}
          error={errors.model?.message}
        />
        <Input
          label="Tytuł"
          {...register('title')}
          error={errors.title?.message}
        />
        <Input
          label="Cena"
          type="number"
          {...register('price', {
            setValueAs: (value) => (value ? parseInt(value, 10) : undefined),
          })}
          error={errors.price?.message}
        />
      </fieldset>
    ),
  },
  {
    label: 'Zdjęcia i opis',
    description: 'Załącz zdjęcia i opis',
    content: () => (
      <fieldset className="flex flex-col space-y-4">
        <Input // TODO: Implement RichTextEditor component
          label="Opis ogłoszenia"
          {...register('description')}
        />
        <label>
          Zdjęcia
          <input // TODO: Implement FileInput component
            type="file"
            multiple
            {...register('photos')}
          />
        </label>
      </fieldset>
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
      <form>
        <Container
          as="main"
          className={styles.content}
        >
          <Stepper.Content />
        </Container>
      </form>
      <Container
        className={clsx(styles.wrapper, styles.footer)}
        as="footer"
      >
        <Stepper.Footer />
      </Container>
    </Stepper>
  )
}
