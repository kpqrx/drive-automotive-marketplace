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

export type OfferParameters = {
  parameters: OfferParametersValue
} & OfferParametersMutators

export const defaultValue: OfferParametersValue = {
  brands: [],
  models: [],
  minYear: null,
  maxYear: null,
  minMileage: null,
  maxMileage: null,
  minPrice: null,
  maxPrice: null,
  fuelTypes: [],
  bodyTypes: [],
  minPower: null,
  maxPower: null,
  multimediaFeatures: [],
  safetyFeatures: [],
  driverAssistanceFeatures: [],
  performanceFeatures: [],
  otherFeatures: [],
}

export const createOfferParametersStore: StateCreator<
  OfferParameters,
  [['zustand/devtools', never]],
  []
> = (set) => ({
  parameters: defaultValue,
  setParameter: (key, value) => set((state) => ({ ...state, [key]: value })),
  removeParameter: (key) =>
    set((state) => ({ ...state, [key]: defaultValue[key] })),
  setAllParameters: (parameters) =>
    set(() => ({ parameters: { ...defaultValue, ...parameters } })),
  removeAllParameters: () =>
    set(() => ({
      parameters: defaultValue,
    })),
})

export const offerParametersStoreOptions = {
  name: 'offer-parameters-store',
}
