import { z } from 'zod'

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Adres email jest wymagany')
    .email('Adres email jest niepoprawny'),
  password: z.string().min(1, 'Hasło jest wymagane'),
})

export type SignInFormSchemaType = z.infer<typeof signInFormSchema>
