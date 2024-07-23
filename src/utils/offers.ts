import type { Offer, OfferParameterValue } from '@/types'
import { toCapitalCase } from './casing'
import dynamic from 'next/dynamic'
import type { IconType } from 'react-icons'
import { BiCircle as defaultIcon } from 'react-icons/bi'

export function parseOffer(offer: Offer) {
  const {
    slug,
    brand,
    model,
    description,
    user: { city, voivodeship },
    price: priceValue,
    power,
    engine,
    fuelType,
    mileage,
    productionYear,
    images: { $values: images },
  } = offer

  const label = `${brand} ${model}`
  const location = `${city}, ${voivodeship}`
  const price = `${priceValue} PLN`
  const properties = [
    `${productionYear}`,
    `${engine}`,
    `${power} KM`,
    `${fuelType}`,
    `${mileage} km`,
  ]
  const thumbnailUrl = images[0].imageUrl
  return {
    slug,
    manufacturer: brand,
    model,
    label,
    description,
    location,
    price,
    properties,
    thumbnailUrl,
  }
}

export function getOffersPageTitle({
  manufacturer,
  model,
  category = 'Samochody osobowe', // TODO: Should be parametrized more categories will be added
}: {
  manufacturer?: string
  model?: string
  category?: string
}) {
  if (manufacturer && model) return toCapitalCase(`${manufacturer} ${model}`)
  if (manufacturer) return toCapitalCase(manufacturer)
  return category
}

export function getOffersCount(offers: unknown[]): [number, string] {
  const count = offers.length
  const term = count === 1 ? 'ogłoszenie' : 'ogłoszeń'
  return [count, term]
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
