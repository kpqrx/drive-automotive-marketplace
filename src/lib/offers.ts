'use server'

import type { OfferParameters, Offer } from '@/types'
import { parseOffer, toPascalCase } from '@/utils'

const { API_BASE_URL } = process.env

type GetFilterSuggestionsResponse = { $values: string[] }

export const getSuggestions = async (
  dataType:
    | 'brands'
    | 'bodytype'
    | 'fueltype'
    | 'multimedia-features'
    | 'safety-features'
    | 'driver-assistance-features'
    | 'performance-features'
    | 'other-features',
) => {
  const req = await fetch(`${API_BASE_URL}/api/filters/suggest-${dataType}`, {
    method: 'GET',
  })

  if (req.status !== 200) {
    throw new Error(req.statusText)
  }

  const { $values: suggestions }: GetFilterSuggestionsResponse =
    await req.json()

  return suggestions
}

export const getQueriedSuggestions = async (
  dataType: 'models',
  query: Record<string, string>,
) => {
  const searchParams = new URLSearchParams(query)

  const req = await fetch(
    `${API_BASE_URL}/api/filters/suggest-${dataType}/?${searchParams.toString()}`,
    {
      method: 'GET',
    },
  )

  if (req.status !== 200) {
    throw new Error(req.statusText)
  }
  const { $values: suggestions }: GetFilterSuggestionsResponse =
    await req.json()

  return suggestions
}

export const getBodyTypes = async () => await getSuggestions('bodytype')
export const getBrands = async () => await getSuggestions('brands')
export const getModels = async (brand: string) =>
  await getQueriedSuggestions('models', { brand })
export const getFuelTypes = async () => await getSuggestions('fueltype')
export const getMultimediaFeatures = async () =>
  await getSuggestions('multimedia-features')
export const getSafetyFeatures = async () =>
  await getSuggestions('safety-features')
export const getDriverAssistanceFeatures = async () =>
  await getSuggestions('driver-assistance-features')
export const getPerformanceFeatures = async () =>
  await getSuggestions('performance-features')
export const getOtherFeatures = async () =>
  await getSuggestions('other-features')

type GetOffersApiResponse = { $values: Offer[] }

export const getOffers = async (offerParameters: OfferParameters = {}) => {
  const pascalCasedOfferParameters = Object.entries(offerParameters).reduce(
    (acc, [key, value]) => {
      const isEmptyValue =
        Array.isArray(value) && value.filter(Boolean).length === 0
      if (isEmptyValue) return acc

      return {
        ...acc,
        [toPascalCase(key)]: value,
      }
    },
    {},
  )

  const searchParams = new URLSearchParams(pascalCasedOfferParameters)

  const req = await fetch(
    `${API_BASE_URL}/api/filters/filterAnn/?${searchParams.toString()}`,
    {
      method: 'GET',
    },
  )

  const { $values: offers }: GetOffersApiResponse = await req.json()
  const parsedOffers = offers.map(parseOffer)

  return parsedOffers
}
