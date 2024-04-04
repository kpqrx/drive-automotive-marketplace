import type { MapContainerProps } from 'react-leaflet'

export interface MapProps extends MapContainerProps {
  long: string
  lat: string
}
