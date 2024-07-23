export type OfferImage = {
  $id: string
  imageId: number
  anId: number
  imageUrl: string
  announcement: OfferReference
}

export type OfferReference = {
  $ref: string
}

export type User = {
  $id: string
  userId: number
  nick: string
  name: string
  surname: string
  phone: string
  email: string
  passwordHash: string
  lan: number
  lng: number
  voivodeship: string
  city: string
  isCompany: boolean
  announcements: {
    $id: string
    $values: OfferReference[]
  }
  favoriteAnnouncements: null
  favoriteUsers: null
  comments: null
}

export type Offer = {
  $id: string
  anId: number
  slug: string
  userId: number
  brand: string
  model: string
  productionYear: number
  generation: string
  fuelType: string
  mileage: number
  damaged: boolean
  undamaged: boolean
  rightHandDrive: boolean
  doorCount: number
  seatCount: number
  price: number
  currency: string
  isFirstOwner: boolean
  fuelConsumption: number
  bodyType: string
  description: string
  power: number
  engine: string
  city: string
  lan: number
  lng: number
  multimedia: null
  driverAssistanceSystems: null
  safety: null
  performance: null
  other: null
  user: User
  comments: null
  images: {
    $id: string
    $values: OfferImage[]
  }
}

export type OfferParameters = {
  brands: string[]
  models: string[]
  bodyTypes: number[]
  fuelTypes: number[]
  minYear: number | null
  maxYear: number | null
  minMileage: number | null
  maxMileage: number | null
  minPrice: number | null
  maxPrice: number | null
  minPower: number | null
  maxPower: number | null
  multimediaFeatures: number[]
  safetyFeatures: number[]
  driverAssistanceFeatures: number[]
  performanceFeatures: number[]
  otherFeatures: number[]
}

export type OfferParameterKey = keyof OfferParameters
export type OfferParameterValue = string[] | number | number[] | null
