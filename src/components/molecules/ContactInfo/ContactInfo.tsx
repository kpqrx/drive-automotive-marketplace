import type { ContactInfoProps } from '@/components/molecules/ContactInfo/ContactInfo.types'
import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import styles from './ContactInfo.module.css'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'

/**
 *
 * @param long - Longitude of the location
 * @param lat - Latitude of the location
 * @returns URL to the proper maps service (Apple or Google)
 * @description Apple Maps API can redirect to Google Maps if the user doesn't have Apple Maps installed
 */
const getMapsUrl = (lat: string, long: string) =>
  `http://maps.apple.com/?ll=${lat},${long}`

export const ContactInfo = (props: ContactInfoProps) => {
  const {
    firstName,
    lastName,
    address,
    phoneNumber,
    profilePictureUrl = '',
    className = '',
    ...restProps
  } = props

  const Map = dynamic(() => import('@/components/atoms/Map/Map'), {
    ssr: false,
    loading: () => <Skeleton className={styles.map} />,
  })

  const formattedAddress = `
    ${address.street ? address.street : ''}
    ${address.postalCode ? address.postalCode : ''} ${address.city},
    ${address.voivodeship ? address.voivodeship : ''}
  `.trim()

  return (
    <div
      className={clsx(className, styles.container)}
      {...restProps}
    >
      <div className={styles.content}>
        <div className={styles.avatarWrapper}>
          <Image
            src={profilePictureUrl}
            alt={`${firstName}'s profile picture`}
            className={styles.avatar}
          />
        </div>
        <p className={styles.name}>
          {firstName} {lastName}
        </p>
        <a
          className={styles.entry}
          href={`tel:${phoneNumber}`}
        >
          <PhoneIcon className={styles.icon} />
          <p>{phoneNumber}</p>
        </a>
        <a
          className={styles.entry}
          href={getMapsUrl(address.lat, address.long)}
        >
          <MapPinIcon className={styles.icon} />
          <p className={styles.address}>{formattedAddress}</p>
        </a>
      </div>
      <Map
        className={styles.map}
        lat={address.lat}
        long={address.long}
      />
    </div>
  )
}
