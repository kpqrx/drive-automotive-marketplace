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
import { getNumbersRange } from '@/utils'
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

  const prodYears = {
    data: getNumbersRange({
      start: 1980,
      end: new Date().getFullYear(),
    }).map((year, index) => ({
      id: index,
      label: year.toString(),
      value: year,
    })),
  }

  const mileage = {
    data: getNumbersRange({
      start: 0,
      end: 300000,
      step: 10000,
    }).map((mileage, index) => ({
      id: index,
      label: mileage.toLocaleString('pl-PL', {
        style: 'unit',
        unit: 'kilometer',
        unitDisplay: 'short',
      }),
      value: mileage,
    })),
  }

  const priceRange = {
    data: getNumbersRange({
      start: 0,
      end: 200000,
      step: 10000,
    }).map((price, index) => ({
      id: index,
      label: price.toLocaleString('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        maximumFractionDigits: 0,
      }),
      value: price,
    })),
  }

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
    prodYears,
    mileage,
    priceRange,
  }
}

export default useOfferParametersSuggestions
