import {
  getBodyTypes,
  getBrands,
  getModels,
  getFuelTypes,
  getDriverAssistanceFeatures,
  getMultimediaFeatures,
  getOtherFeatures,
  getPerformanceFeatures,
  getSafetyFeatures,
} from '@/lib'
import useSWR from 'swr'

function useOfferParametersSuggestions(parameters: { modelsQuery?: string }) {
  const { modelsQuery } = parameters

  const bodyTypes = useSWR('bodyTypes', getBodyTypes)
  const brands = useSWR('brands', getBrands)
  const models = useSWR(`models/${modelsQuery}`, () => getModels(modelsQuery))
  const fuelTypes = useSWR('fuelTypes', getFuelTypes)
  const multimediaFeatures = useSWR('multimediaFeatures', getMultimediaFeatures)
  const safetyFeatures = useSWR('safetyFeatures', getSafetyFeatures)
  const driverAssistanceFeatures = useSWR(
    'driverAssistanceFeatures',
    getDriverAssistanceFeatures,
  )
  const performanceFeatures = useSWR(
    'performanceFeatures',
    getPerformanceFeatures,
  )
  const otherFeatures = useSWR('otherFeatures', getOtherFeatures)

  return {
    bodyTypes,
    brands,
    models,
    fuelTypes,
    multimediaFeatures,
    safetyFeatures,
    driverAssistanceFeatures,
    performanceFeatures,
    otherFeatures,
  }
}

export default useOfferParametersSuggestions
