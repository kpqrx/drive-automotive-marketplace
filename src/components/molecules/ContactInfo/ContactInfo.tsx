import { Map } from '@/components'
import type { ContactInfoProps } from '@/components/molecules/ContactInfo/ContactInfo.types'
import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import styles from './ContactInfo.module.css'

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

  return (
    <div
      className={clsx(className, styles.container)}
      {...restProps}
    >
      <div className={styles.content}>
        <div className={styles.avatarWrapper}>
          <img
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
          <p>
            {address.street}, <br />
            {address.postalCode} {address.city}
          </p>
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
