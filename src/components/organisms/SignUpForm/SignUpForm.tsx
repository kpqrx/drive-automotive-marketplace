'use client'
import styles from './SignUpForm.module.css'
import type { SignUpFormProps } from '@/components/organisms/SignUpForm/SignUpForm.types'
import { Input, Button, Container } from '@/components'
import clsx from 'clsx'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpFormSchema, type SignUpFormSchemaType } from '@/schemas'
import { signUp } from '@/lib'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const SignUpForm = (props: SignUpFormProps) => {
  const { className, ...restProps } = props

  const formMethods = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formMethods

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit: SubmitHandler<SignUpFormSchemaType> = async (data) => {
    setErrorMessage(null)

    try {
      const user = await signUp(data)

      if (user) {
        router.push('/sign-in')
      }
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
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          {...restProps}
        >
          <h2 className={styles.heading}>Utwórz konto</h2>

          <fieldset className={styles.fieldsWrapper}>
            <Input
              label="Imię"
              {...register('firstName')}
              error={errors.firstName?.message}
            />
            <Input
              label="Nazwisko"
              {...register('lastName')}
              error={errors.lastName?.message}
            />
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
            <Input
              label="Powtórz hasło"
              type="password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
            <Input
              label="Numer telefonu"
              {...register('phoneNumber')}
              error={errors.phoneNumber?.message}
            />
            <Input
              label="Miasto"
              {...register('city')}
              error={errors.city?.message}
            />
          </fieldset>

          {
            // Due to Radix Checkbox limiatations, it's not possible to use it with RHF
            // TODO: Investigate how to use Radix Checkbox with React Hook Form
            // <Checkbox
            //   {...register('consent')}
            //   error={errors.consent?.message}
            // >
            //   Zapoznałem się z regulaminem serwisu i akceptuję jego postanowienia
            // </Checkbox>
          }

          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <div className={styles.buttonsWrapper}>
            <Button type="submit">Zarejestruj się</Button>
            <Button
              href="/sign-in"
              variant="secondary"
            >
              Masz już konto? Zaloguj się
            </Button>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}
