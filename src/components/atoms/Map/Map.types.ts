import type { ComponentPropsWithoutRef } from 'react'

export interface MapProps extends ComponentPropsWithoutRef<'div'> {
  long: string
  lat: string
}
