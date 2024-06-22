import { z } from 'zod'

export const addOfferFormSchema = z.object({
  make: z.string({ required_error: 'Marka jest wymagana' }),
  model: z.string({ required_error: 'Model jest wymagany' }),
  title: z
    .string()
    .max(48, 'Maksymalna długość tytułu to 48 znaków')
    .optional(),
  description: z
    .string({ required_error: 'Opis ogłoszenia jest wymagany' })
    .min(64, 'Minimalna długość opisu to 64 znaki')
    .max(512, 'Maksymalna długość opisu to 512 znaków'),
  price: z
    .number({
      required_error: 'Cena jest wymagana',
      invalid_type_error: 'Kwota musi być wartością liczbową',
    })
    .positive('Wartość kwoty jest nieprawidłowa')
    .finite(),
  photos: z
    .array(z.custom<File>(), { invalid_type_error: 'Zdjęcia są wymagane' })
    .refine((value) => {
      const files = Array.from(value)
      return files.every((file) => file.size <= 5 * 1024 * 1024)
    }, 'Rozmiar plików nie może przekraczać 5MB')
    .refine((value) => {
      const files = Array.from(value)
      return files.every((file) => file.name.match(/\.(jpg|jpeg|png)$/i))
    }, 'Plik muszą być w formacie JPG, JPEG lub PNG')
    .refine((value) => {
      console.log(value)
      return value.length >= 4
    }, 'Minimalna liczba zdjęć to 4')
    .refine((value) => value.length <= 8, 'Maksymalna liczba zdjęć to 8'),
})

export type AddOfferFormSchemaType = z.infer<typeof addOfferFormSchema>
