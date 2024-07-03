'use client'
import styles from './SignInForm.module.css'
import type { SignInFormProps } from '@/components/organisms/SignInForm/SignInForm.types'
import { Input, Button, Container } from '@/components'
import clsx from 'clsx'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInFormSchema, type SignInFormSchemaType } from '@/schemas'

export const SignInForm = (props: SignInFormProps) => {
  const { className, onSubmit: onSubmitCallback, ...restProps } = props

  const formMethods = useForm<SignInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formMethods

  const onSubmit: SubmitHandler<SignInFormSchemaType> = (data) => {
    if (onSubmitCallback) {
      onSubmitCallback()
    }

    alert(JSON.stringify(data, null, 2))
  }

  return (
    <FormProvider {...formMethods}>
      <Container
        as="form"
        className={clsx(styles.container, className)}
        onSubmit={handleSubmit(onSubmit)}
        {...restProps}
      >
        <h2 className={styles.heading}>Zaloguj się</h2>

        <fieldset className={styles.fieldsWrapper}>
          <Input
            label="Adres email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Hasło"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
        </fieldset>

        <Button
          className={styles.button}
          type="submit"
        >
          Zaloguj się
        </Button>
      </Container>
    </FormProvider>
  )
}
