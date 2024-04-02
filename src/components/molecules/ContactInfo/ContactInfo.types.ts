import type { ComponentPropsWithoutRef } from 'react'

export type AddressData = {
  street: string
  city: string
  postalCode: string
  long: string
  lat: string
}

export interface ContactInfoProps extends ComponentPropsWithoutRef<'div'> {
  firstName: string
  lastName: string
  profilePictureUrl?: string
  address: AddressData
  phoneNumber: string
}
