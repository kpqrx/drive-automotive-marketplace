import { z } from 'zod'

export const offerFilteringFormSchema = z.object({
  brands: z.string().array(),
  models: z.string().array(),
  fuelTypes: z.string().array(),
  minYear: z.number().array(),
  maxYear: z.number().array(),
  minMileage: z.number().array(),
  maxMileage: z.number().array(),
  minPrice: z.number().array(),
  maxPrice: z.number().array(),
  maxFuelConsumption: z.number().array(),
  bodyTypes: z.string().array(),
  damaged: z.boolean(),
  undamaged: z.boolean(),
  rightHandDrive: z.boolean(),
  doorCount: z.number().array(),
  seatCount: z.number().array(),
  isFirstOwner: z.boolean(),
  minPower: z.number().array(),
  maxPower: z.number().array(),
  multimediaFeatures: z.number().array(),
  safetyFeatures: z.number().array(),
  driverAssistanceFeatures: z.number().array(),
  performanceFeatures: z.number().array(),
  otherFeatures: z.number().array(),
})

export type OfferFilteringFormSchema = z.infer<typeof offerFilteringFormSchema>
export type OfferFilteringFormSchemaKey = keyof OfferFilteringFormSchema
