import React from 'react'
import styles from './OfferTile.module.css'
import type { OfferTileProps } from '@/components/molecules/OfferTile/OfferTile.types'
import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon as CommentsIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import { Chip } from '@/components/atoms/Chip/Chip'

export const OfferTile = (props: OfferTileProps) => {
  const {
    href,
    label,
    description,
    location,
    price,
    icon: Icon,
    thumbnailSrc,
    properties,
    orientation = 'vertical',
    className = '',
    onLikeButtonClick,
    ...restProps
  } = props

  const formattedPrice = price.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    currencyDisplay: 'code',
    maximumFractionDigits: 0,
  })

  return (
    <div
      className={clsx(
        className,
        styles.container,
        orientation === 'horizontal'
          ? styles.containerHorizontal
          : styles.containerVertical,
      )}
      {...restProps}
    >
      <Image
        className={styles.thumbnail}
        src={thumbnailSrc}
        width={360}
        height={210}
        alt={label}
      />
      <div className={styles.wrapper}>
        <Link
          href={href}
          className={styles.link}
        >
          <div className={styles.contentWrapper}>
            <div className={styles.labelWrapper}>
              <Icon className={styles.manufacturerIcon} />
              <h3 className={styles.label}>{label}</h3>
            </div>
            <span className={styles.price}>{formattedPrice}</span>
          </div>
          <p className={styles.description}>{description}</p>
          <div className={styles.propertiesWrapper}>
            {properties.map((property, i) => (
              <Chip key={i}>{property}</Chip>
            ))}
          </div>
          <span className={styles.location}>
            <MapPinIcon className={styles.mapPinIcon} />
            {location}
          </span>
        </Link>
        <ul className={styles.iconButtonsContainer}>
          {/* <li> // TODO: Investigate why the button is not working
            <button
              className={styles.iconButton}
              onClick={onLikeButtonClick}
              // TODO: Style to indicate that the offer is liked
            >
              <HeartIcon />
            </button>
          </li> */}
          <li>
            <Link
              href={`${href}#discussion`}
              className={styles.iconButton}
            >
              <CommentsIcon />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
