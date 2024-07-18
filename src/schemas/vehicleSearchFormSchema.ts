import { z } from 'zod'

export const vehicleSearchFormSchema = z.object({
  bodyType: z.string().optional(),
  manufacturer: z.string().optional(),
  model: z.string().optional(),
})

export type VehicleSearchFormSchemaType = z.infer<
  typeof vehicleSearchFormSchema
>
