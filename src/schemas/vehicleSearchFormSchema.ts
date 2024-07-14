import { z } from 'zod'

export const vehicleSearchFormSchema = z.object({
  bodyType: z.string().min(1, 'Wybierz typ nadwozia'),
  manufacturer: z.string().min(1, 'Wybierz producenta'),
  model: z.string().min(1, 'Wybierz model'),
})

export type VehicleSearchFormSchemaType = z.infer<
  typeof vehicleSearchFormSchema
>
