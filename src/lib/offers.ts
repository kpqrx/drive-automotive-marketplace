'use server'

import type { FilterParameters, Offer } from '@/types'
import { parseOffer, toPascalCase } from '@/utils'

const { API_BASE_URL } = process.env

type GetFilterSuggestionsResponse = { $values: string[] }

export const getBodyTypes = async () => {
  const req = await fetch(`${API_BASE_URL}/api/filters/suggest-bodytype`, {
    method: 'GET',
  })

  if (req.status !== 200) {
    throw new Error(req.statusText)
  }

  const { $values: bodyTypes }: GetFilterSuggestionsResponse = await req.json()

  return bodyTypes
}

export const getManufacturers = async () => {
  const req = await fetch(`${API_BASE_URL}/api/filters/suggest-brands`, {
    method: 'GET',
  })

  if (req.status !== 200) {
    throw new Error(req.statusText)
  }

  const { $values: manufacturers }: GetFilterSuggestionsResponse =
    await req.json()

  return manufacturers
}

export const getModels = async (manufacturer: string) => {
  const searchParams = new URLSearchParams({ brand: manufacturer })

  const req = await fetch(
    `${API_BASE_URL}/api/filters/suggest-models/?${searchParams.toString()}`,
    {
      method: 'GET',
    },
  )

  if (req.status === 200) {
    throw new Error(req.statusText)
  }
  const { $values: models }: GetFilterSuggestionsResponse = await req.json()
  return models
}

type GetFilteredOffersApiResponse = { $values: Offer[] }

export const getFilteredOffers = async (filterParameters: FilterParameters) => {
  const pascalCasedFilterParameters = Object.entries(filterParameters).reduce(
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

  const searchParams = new URLSearchParams(pascalCasedFilterParameters)

  const req = await fetch(
    `${API_BASE_URL}/api/filters/filterAnn/?${searchParams.toString()}`,
    {
      method: 'GET',
    },
  )

  const { $values: offers }: GetFilteredOffersApiResponse = await req.json()
  const parsedOffers = offers.map(parseOffer)

  return parsedOffers
}
