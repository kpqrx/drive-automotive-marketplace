import { type StateCreator } from 'zustand'
import type {
  OfferParameterKey,
  OfferParameters as OfferParametersValue,
} from '@/types'

type OfferParametersMutators = {
  setParameter: (key: OfferParameterKey, value: string | string[]) => void
  removeParameter: (key: OfferParameterKey) => void
  setAllParameters: (filters: OfferParametersValue) => void
  removeAllParameters: () => void
}

export type OfferParameters = OfferParametersValue & OfferParametersMutators

const defaultValue: OfferParametersValue = {
  brands: [],
  models: [],
  minYear: NaN,
  maxYear: NaN,
  minMileage: NaN,
  maxMileage: NaN,
  minPrice: NaN,
  maxPrice: NaN,
  bodyTypes: [],
  minPower: NaN,
  maxPower: NaN,
  multimediaFeatures: [],
  safetyFeatures: [],
  driverAssistanceSystemsFeatures: [],
  performanceFeatures: [],
  otherFeatures: [],
}

export const createOfferParametersStore: StateCreator<
  OfferParameters,
  [['zustand/devtools', never]],
  []
> = (set) => ({
  ...defaultValue,
  setParameter: (key, value) => set((state) => ({ ...state, [key]: value })),
  removeParameter: (key) =>
    set((state) => ({ ...state, [key]: defaultValue[key] })),
  setAllParameters: (filters) => set(() => filters),
  removeAllParameters: () => set(() => defaultValue),
})

export const offerParametersStoreOptions = {
  name: 'offer-parameters-store',
}
