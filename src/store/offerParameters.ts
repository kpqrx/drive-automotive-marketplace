import { type StateCreator } from 'zustand'
import type {
  OfferParameterKey,
  OfferParameterValue,
  OfferParameters as OfferParametersValue,
} from '@/types'

type OfferParametersMutators = {
  setParameter: (key: OfferParameterKey, value: OfferParameterValue) => void
  removeParameter: (key: OfferParameterKey) => void
  setAllParameters: (filters: OfferParametersValue) => void
  removeAllParameters: () => void
}

export type OfferParameters = OfferParametersValue & OfferParametersMutators

const defaultValue: OfferParametersValue = {
  brands: undefined,
  models: undefined,
  generations: undefined,
  minYear: undefined,
  maxYear: undefined,
  minMileage: undefined,
  maxMileage: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  maxFuelConsumption: undefined,
  bodyTypes: undefined,
  damaged: undefined,
  undamaged: undefined,
  rightHandDrive: undefined,
  doorCount: undefined,
  seatCount: undefined,
  isFirstOwner: undefined,
  minPower: undefined,
  maxPower: undefined,
  multimediaFeatures: undefined,
  safetyFeatures: undefined,
  driverAssistanceSystemsFeatures: undefined,
  performanceFeatures: undefined,
  otherFeatures: undefined,
}

export const createOfferParametersStore: StateCreator<
  OfferParameters,
  [['zustand/devtools', never]],
  []
> = (set) => ({
  ...defaultValue,
  setParameter: (key, value) => set((state) => ({ ...state, [key]: value })),
  removeParameter: (key) => set((state) => ({ ...state, [key]: undefined })),
  setAllParameters: (filters) => set(() => filters),
  removeAllParameters: () => set(() => defaultValue),
})

export const offerParametersStoreOptions = {
  name: 'offer-parameters-store',
}
