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

export type FilterParameters = {
  brands?: string[]
  models?: string[]
  generations?: string[]
  minYear?: number
  maxYear?: number
  minMileage?: number
  maxMileage?: number
  minPrice?: number
  maxPrice?: number
  maxFuelConsumption?: number
  bodyTypes?: string[]
  damaged?: boolean
  undamaged?: boolean
  rightHandDrive?: boolean
  doorCount?: number
  seatCount?: number
  isFirstOwner?: boolean
  minPower?: number
  maxPower?: number
  multimediaFeatures?: number[]
  safetyFeatures?: number[]
  driverAssistanceSystemsFeatures?: number[]
  performanceFeatures?: number[]
  otherFeatures?: number[]
}
