'use client'
import styles from './SignInForm.module.css'
import type { SignInFormProps } from '@/components/organisms/SignInForm/SignInForm.types'
import { Input, Button, Container } from '@/components'
import clsx from 'clsx'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInFormSchema, type SignInFormSchemaType } from '@/schemas'
import { signIn } from '@/lib'
import { useState } from 'react'

export const SignInForm = (props: SignInFormProps) => {
  const { className, ...restProps } = props

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

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onSubmit: SubmitHandler<SignInFormSchemaType> = async (data) => {
    setErrorMessage(null)

    try {
      const user = await signIn(data)

      // TODO: Store user data in global store (persistent)
    } catch (error) {
      if (!(error instanceof Error)) {
        return
      }
      setErrorMessage(error.message)
    }
  }

  return (
    <Container className={clsx(styles.container, className)}>
      <FormProvider {...formMethods}>
        <form
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

          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <div className={styles.buttonsWrapper}>
            <Button type="submit">Zaloguj się</Button>
            <Button
              href="/sign-up"
              variant="secondary"
            >
              Nie masz konta? Zarejestruj się
            </Button>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}
