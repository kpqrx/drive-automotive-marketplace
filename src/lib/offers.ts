'use server'

import type { OfferParameters, Offer, Comment } from '@/types'
import { parseComment, parseOffer } from '@/utils'
import { cookies } from 'next/headers'

const { API_BASE_URL } = process.env

type GetFilterSuggestionsResponse = {
  $values: {
    id: number
    label: string
    value?: string
  }[]
}

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
    throw new Error(
      `Failed to fetch ${dataType} suggestions: ${req.statusText}`,
    )
  }

  const { $values }: GetFilterSuggestionsResponse = await req.json()

  const suggestions = $values.map(({ label, value, id }) => ({
    label,
    value: value || id,
  }))

  return suggestions
}

export const getQueriedSuggestions = async (
  dataType: 'models',
  query: Partial<Record<string, string>>,
) => {
  if (Object.values(query).some((value) => !value)) return []

  const searchParams = new URLSearchParams(query as Record<string, string>)

  const req = await fetch(
    `${API_BASE_URL}/api/filters/suggest-${dataType}/?${searchParams.toString()}`,
    {
      method: 'GET',
    },
  )

  if (req.status !== 200) {
    throw new Error(req.statusText)
  }

  const { $values }: GetFilterSuggestionsResponse = await req.json()

  const suggestions = $values.map(({ label, value, id }) => ({
    label,
    value: value || id,
  }))

  return suggestions
}

export const getBodyTypes = async () => await getSuggestions('bodytype')
export const getBrands = async () => await getSuggestions('brands')
export const getModels = async (brand?: string) =>
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

export const getOffers = async (rawOfferParameters?: OfferParameters) => {
  const offerParameters = Object.entries(rawOfferParameters ?? {}).reduce(
    (acc, [key, rawValue]) => {
      if (!rawValue || (Array.isArray(rawValue) && rawValue.length <= 0))
        return acc

      let value: string[] | number[] | number | string = rawValue
      if (Number(rawValue)) value = Number(rawValue)
      if (Array.isArray(rawValue) && rawValue.some(Number))
        value = rawValue.map(Number)

      return { ...acc, [key]: value }
    },
    {},
  )

  const req = await fetch(`${API_BASE_URL}/api/filters/filterAnn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(offerParameters),
  })

  const { $values: offers }: GetOffersApiResponse = await req.json()
  const parsedOffers = offers.map(parseOffer)

  return parsedOffers
}

export const getOfferBySlug = async (slug: string) => {
  const req = await fetch(`${API_BASE_URL}/api/platform/getAnnBySlug/${slug}`, {
    method: 'GET',
  })

  if (req.status !== 200) {
    throw new Error(`Failed to fetch offer by slug: ${req.statusText}`)
  }

  const offer: Offer = await req.json()

  const parsedOffer = parseOffer(offer)

  return parsedOffer
}

type GetCommentsByOfferIdApiResponse = { $values: Comment[] }

export const getCommentsByOfferId = async (offerId: string) => {
  const req = await fetch(
    `${API_BASE_URL}/api/platform/getCommentsByAnnId/${offerId}`,
    {
      method: 'GET',
    },
  )

  if (req.status !== 200) {
    throw new Error(`Failed to fetch comments by offer id: ${req.statusText}`)
  }

  const { $values: comments }: GetCommentsByOfferIdApiResponse =
    await req.json()

  const parsedComments = comments.map(parseComment)

  return parsedComments
}

export const postComment = async (offerId: string, content: string) => {
  const token = cookies().get('token')?.value

  const req = await fetch(`${API_BASE_URL}/api/platform/AddComment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ anId: offerId, commentText: content }),
  })

  if (req.status !== 200) {
    throw new Error(`Failed to post comment: ${req.statusText}`, {
      cause: req.status,
    })
  }
}

export const deleteComment = async (commentId: number) => {
  const token = cookies().get('token')?.value

  const req = await fetch(
    `${API_BASE_URL}/api/platform/DeleteComment/${commentId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (req.status !== 200) {
    throw new Error(`Failed to delete comment: ${req.statusText}`, {
      cause: req.status,
    })
  }
}

export const addOfferToLiked = async (slug: string) => {
  const token = cookies().get('token')?.value

  const req = await fetch(
    `${API_BASE_URL}/api/platform/AddAnnToFavorites/${slug}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (req.status !== 200) {
    throw new Error(`Failed to add offer to liked: ${req.statusText}`, {
      cause: req.status,
    })
  }
}
