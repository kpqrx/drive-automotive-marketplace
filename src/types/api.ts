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

export type OfferParameterStringValue = string[]
export type OfferParameterNumberValue = number[]
export type OfferParameterTruthyValue = true
export type OfferParameterValue =
  | OfferParameterStringValue
  | OfferParameterNumberValue
  | OfferParameterTruthyValue

export type OfferParameters = {
  brands?: OfferParameterStringValue
  models?: OfferParameterStringValue
  generations?: OfferParameterStringValue
  minYear?: OfferParameterNumberValue
  maxYear?: OfferParameterNumberValue
  minMileage?: OfferParameterNumberValue
  maxMileage?: OfferParameterNumberValue
  minPrice?: OfferParameterNumberValue
  maxPrice?: OfferParameterNumberValue
  maxFuelConsumption?: OfferParameterNumberValue
  bodyTypes?: OfferParameterStringValue
  damaged?: OfferParameterTruthyValue
  undamaged?: OfferParameterTruthyValue
  rightHandDrive?: OfferParameterTruthyValue
  doorCount?: OfferParameterNumberValue
  seatCount?: OfferParameterNumberValue
  isFirstOwner?: OfferParameterTruthyValue
  minPower?: OfferParameterNumberValue
  maxPower?: OfferParameterNumberValue
  multimediaFeatures?: OfferParameterNumberValue
  safetyFeatures?: OfferParameterNumberValue
  driverAssistanceSystemsFeatures?: OfferParameterNumberValue
  performanceFeatures?: OfferParameterNumberValue
  otherFeatures?: OfferParameterNumberValue
}

export type OfferParameterKey = keyof OfferParameters
