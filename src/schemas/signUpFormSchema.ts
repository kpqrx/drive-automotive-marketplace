import { z } from 'zod'

export const signUpFormSchema = z
  .object({
    firstName: z.string().min(1, 'Imię jest wymagane'),
    lastName: z.string().min(1, 'Nazwisko jest wymagane'),
    email: z
      .string()
      .min(1, 'Adres email jest wymagany')
      .email('Adres email jest niepoprawny'),
    phoneNumber: z
      .string()
      .min(1, 'Numer telefonu jest wymagany')
      .regex(/^\d{9}$/, 'Numer telefonu jest niepoprawny'),
    city: z.string().min(1, 'Miasto jest wymagane'),
    password: z.string().min(1, 'Hasło jest wymagane'),
    confirmPassword: z.string().min(1, 'Ponowienie hasła jest wymagane'),
    // consent: z.boolean(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Hasła muszą być takie same',
    path: ['confirmPassword'],
  })

export type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>
