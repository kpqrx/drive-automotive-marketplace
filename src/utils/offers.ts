import type {
  Offer,
  OfferParameterKey,
  OfferParameterValue,
  Comment,
} from '@/types'
import { kebabToNormalCase, toCapitalCase } from './casing'
import dynamic from 'next/dynamic'
import type { IconType } from 'react-icons'
import { BiCircle as defaultIcon } from 'react-icons/bi'
import type { AddOfferFormSchemaType } from '@/schemas'

const _mapFeaturesToLabels = (features: { label: string }[] = []) => [
  // Extract labels and remove duplicates
  ...new Set(features.map(({ label }) => label)),
]

export function parseOffer(offer: Offer) {
  const {
    id,
    // @ts-expect-error - Workaround for awful API and it's inconsistency
    anId,
    slug,
    brand,
    model,
    description,
    user,
    price,
    power,
    engine,
    fuelType,
    mileage,
    productionYear,
    images: { $values: imageValues },
    lan,
    lng,
    multimedia = { $values: [] },
    driverAssistanceSystems = { $values: [] },
    safety = { $values: [] },
    performance = { $values: [] },
    other = { $values: [] },
  } = offer

  const label = `${brand} ${model}`
  const properties = {
    productionYear: productionYear.toString(),
    engine: engine.toString(),
    power: `${power} KM`,
    fuelType: `${fuelType}`,
    mileage: mileage.toLocaleString('pl-PL', {
      style: 'unit',
      unit: 'kilometer',
    }),
  }
  const thumbnailUrl = imageValues[0].imageUrl
  const images = imageValues.map(({ imageUrl }) => imageUrl)
  return {
    id: id ?? anId,
    slug,
    manufacturer: brand,
    model,
    label,
    description,
    user,
    price,
    properties,
    thumbnailUrl,
    images,
    lat: lan,
    long: lng,
    features: {
      multimedia: _mapFeaturesToLabels(multimedia.$values),
      driverAssistance: _mapFeaturesToLabels(driverAssistanceSystems.$values),
      safety: _mapFeaturesToLabels(safety.$values),
      performance: _mapFeaturesToLabels(performance.$values),
      other: _mapFeaturesToLabels(other.$values),
    },
  }
}

export function getOffersPageTitle({
  brands,
  models,
  category = 'Samochody osobowe', // TODO: Should be parametrized when more categories will be added
}: {
  brands?: string[]
  models?: string[]
  category?: string
}) {
  const formattedBrands = brands?.map(kebabToNormalCase)
  const formattedModels = models?.map(kebabToNormalCase)

  if (formattedBrands && formattedBrands.length >= 2)
    return `${formattedBrands[0]}, ${formattedBrands[1]} i inne`
  if (formattedBrands && formattedBrands[0] && formattedModels?.length === 1)
    return `${formattedBrands[0]} ${formattedModels[0]}`
  if (formattedBrands && formattedBrands.length === 1)
    return `Samochody ${formattedBrands[0]}`
  return category
}

export function getOffersCountTerm(count: number) {
  return count === 1 ? 'ogłoszenie' : 'ogłoszeń'
}

export function getIconByManufacturer(manufacturer: string): IconType {
  const moduleName = `Si${toCapitalCase(manufacturer.split(' ').join('').toLowerCase())}`

  // @ts-expect-error TODO: Fix typing
  const icon = dynamic(() =>
    import('react-icons/si').then((mod) => {
      if (moduleName in mod) return mod[moduleName]
      return defaultIcon
    }),
  ) as IconType

  return icon
}

export function isEmptyOfferParameterValue(value: OfferParameterValue) {
  return value === null || (Array.isArray(value) && value.length === 0)
}

export function mapKeyToLabel(key: string) {
  const keyToLabelMap: Record<OfferParameterKey, string> = {
    brands: 'Marka',
    models: 'Model',
    bodyTypes: 'Typ nadwozia',
    fuelTypes: 'Rodzaj paliwa',
    minYear: 'Rok produkcji',
    maxYear: 'Rok produkcji',
    minMileage: 'Przebieg',
    maxMileage: 'Przebieg',
    minPrice: 'Cena',
    maxPrice: 'Cena',
    minPower: 'Moc silnika',
    maxPower: 'Moc silnika',
    multimediaFeatures: 'Wyp. multimedialne',
    safetyFeatures: 'Wyp. bezpieczeństwa',
    driverAssistanceFeatures: 'Wyp. wspomagające kierowcę',
    performanceFeatures: 'Wyp. sportowe',
    otherFeatures: 'Wyp. dodatkowe',
  }
  return keyToLabelMap[key as OfferParameterKey] as string
}

export const parseComment = (comment: Comment) => ({
  id: comment.commentId,
  author: `${comment.user.name} ${comment.user.surname}`,
  authorId: comment.user.userId.toString(),
  content: comment.commentText,
  date: comment.datePosted,
})

export const getOfferFormData = (data: AddOfferFormSchemaType) => {
  const formData = new FormData()

  formData.append('Brand', data.brand)
  formData.append('Model', data.model)
  formData.append('Power', data.power.toString())
  formData.append('Mileage', data.mileage.toString())
  formData.append('ProductionYear', data.prodYear.toString())
  formData.append('FuelType', data.fuelType)
  formData.append('BodyType', data.bodyType)
  formData.append('Description', data.description)
  formData.append('Price', data.price.toString())

  if (data.title) formData.append('summary', data.title)

  data.multimediaFeatures?.forEach((feature) =>
    formData.append('MultimediaFeatures', feature.toString()),
  )
  data.safetyFeatures?.forEach((feature) =>
    formData.append('SafetyFeatures', feature.toString()),
  )
  data.driverAssistanceFeatures?.forEach((feature) =>
    formData.append('DriverAssistanceFeatures', feature.toString()),
  )
  data.performanceFeatures?.forEach((feature) =>
    formData.append('PerformanceFeatures', feature.toString()),
  )
  data.otherFeatures?.forEach((feature) =>
    formData.append('OtherFeatures', feature.toString()),
  )

  data.photos.forEach((photo) => formData.append('Photos', photo))

  return formData
}
