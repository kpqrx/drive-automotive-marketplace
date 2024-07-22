import { z } from 'zod'

export const offerFilteringFormSchema = z.object({
  brands: z.string().array().optional(),
  models: z.string().array().optional(),
  fuelTypes: z.string().array().optional(),
  minYear: z.number().array().optional(),
  maxYear: z.number().array().optional(),
  minMileage: z.number().array().optional(),
  maxMileage: z.number().array().optional(),
  minPrice: z.number().array().optional(),
  maxPrice: z.number().array().optional(),
  maxFuelConsumption: z.number().array().optional(),
  bodyTypes: z.string().array().optional(),
  damaged: z.boolean().optional(),
  undamaged: z.boolean().optional(),
  rightHandDrive: z.boolean().optional(),
  doorCount: z.number().array().optional(),
  seatCount: z.number().array().optional(),
  isFirstOwner: z.boolean().optional(),
  minPower: z.number().array().optional(),
  maxPower: z.number().array().optional(),
  multimediaFeatures: z.number().array().optional(),
  safetyFeatures: z.number().array().optional(),
  driverAssistanceFeatures: z.number().array().optional(),
  performanceFeatures: z.number().array().optional(),
  otherFeatures: z.number().array().optional(),
})

export type OfferFilteringFormSchema = z.infer<typeof offerFilteringFormSchema>
export type OfferFilteringFormSchemaKey = keyof OfferFilteringFormSchema
