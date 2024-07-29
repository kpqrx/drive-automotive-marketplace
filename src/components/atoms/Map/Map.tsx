'use client'
import styles from './Map.module.css'
import type { MapProps } from '@/components/atoms/Map/Map.types'
import clsx from 'clsx'
import { divIcon, type LatLngExpression } from 'leaflet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPinIcon } from '@heroicons/react/24/solid'
import { renderToString } from 'react-dom/server'

const markerIcon = divIcon({
  html: renderToString(<MapPinIcon />),
  iconSize: [56, 56],
  iconAnchor: [28, 56],
  className: styles.markerIcon,
})

const Map = (props: MapProps) => {
  const { lat, long, className = '', ...restProps } = props

  const position: LatLngExpression = [+lat, +long]
  // TODO: Add skeleton loader
  return (
    <MapContainer
      className={clsx(className, styles.container)}
      center={position}
      zoom={6}
      zoomControl={false}
      attributionControl={false}
      {...restProps}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        zIndex={0}
      />
      <Marker
        position={position}
        icon={markerIcon}
      />
    </MapContainer>
  )
}

export default Map
