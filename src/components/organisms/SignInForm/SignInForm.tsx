'use client'
import styles from './SignInForm.module.css'
import type { SignInFormProps } from '@/components/organisms/SignInForm/SignInForm.types'
import { Input, Button, Container } from '@/components'
import clsx from 'clsx'
import { FormProvider, useForm, type SubmitHandler, set } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInFormSchema, type SignInFormSchemaType } from '@/schemas'
import { signIn } from '@/lib'
import { useState } from 'react'
import { useUserStore } from '@/stores'
import { useRouter } from 'next/navigation'

const LoadingIcon = () => (
  <svg
    className="animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      d="m1,12C1,5.92,5.92,1,12,1"
      fill="none"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

export const SignInForm = (props: SignInFormProps) => {
  const { className, ...restProps } = props

  const formMethods = useForm<SignInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = formMethods

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { setUser } = useUserStore()
  const router = useRouter()

  const onSubmit: SubmitHandler<SignInFormSchemaType> = async (data) => {
    setErrorMessage(null)

    try {
      const user = await signIn(data)

      setUser(user)
      router.back()
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
            <Button type="submit">
              {isSubmitting ? <LoadingIcon /> : 'Zaloguj się'}
            </Button>
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
