'use client'
import { useEffect, useRef } from 'react'
import styles from './Map.module.css'
import type { MapProps } from '@/components/atoms/Map/Map.types'
import clsx from 'clsx'
import { Loader } from '@googlemaps/js-api-loader'

export const Map = (props: MapProps) => {
  const { lat, long, className = '', ...restProps } = props
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMapInitialization = async () => {
      if (!containerRef.current) {
        return
      }

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
      })
      const { Map } = await loader.importLibrary('maps')
      const { AdvancedMarkerElement } = await loader.importLibrary('marker')
      const mapOptions: google.maps.MapOptions = {
        zoom: 17,
        mapId: `map-${lat}-${long}`,
        center: { lat: parseFloat(lat), lng: parseFloat(long) },
        clickableIcons: false,
        disableDefaultUI: true,
      }

      const map = new Map(containerRef.current, mapOptions)
      const marker = new AdvancedMarkerElement({
        map,
        position: mapOptions.center,
      })
    }

    handleMapInitialization()
  }, [lat, long])

  // TODO: Add skeleton loader
  return (
    <div
      ref={containerRef}
      className={clsx(className, styles.container)}
      {...restProps}
    />
  )
}
