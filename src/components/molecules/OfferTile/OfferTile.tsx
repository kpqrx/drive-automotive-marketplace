import React from 'react'
import styles from './OfferTile.module.css'
import type { OfferTileProps } from '@/components/molecules/OfferTile/OfferTile.types'
import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { SiBmw } from 'react-icons/si'
import {
  HiOutlineHeart as HeartIcon,
  HiOutlinePhone as PhoneIcon,
  HiOutlineChatBubbleOvalLeft as CommentsIcon,
} from 'react-icons/hi2'
import { Chip } from '@/components/atoms/Chip/Chip'

export const OfferTile = (props: OfferTileProps) => {
  const {
    href,
    label,
    description,
    price,
    thumbnailSrc,
    properties,
    className = '',
    ...restProps
  } = props

  return (
    <Link
      href={href}
      className={clsx(className, styles.container)}
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
        <div className={styles.typographyWrapper}>
          <div className={styles.labelWrapper}>
            <SiBmw className={styles.manufacturerIcon} />
            <h3 className={styles.label}>{label}</h3>
          </div>
          <span className={styles.price}>{price}</span>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.propertiesWrapper}>
          {properties.map((property, i) => (
            <Chip key={i}>{property}</Chip>
          ))}
        </div>
      </div>
      <ul className={styles.iconButtonsContainer}>
        <li className={styles.iconButtonWrapper}>
          <button className={styles.iconButton}>
            <HeartIcon />
          </button>
        </li>
        <li className={styles.iconButtonWrapper}>
          <button className={styles.iconButton}>
            <CommentsIcon />
          </button>
        </li>
        <li className={styles.iconButtonWrapper}>
          <button className={styles.iconButton}>
            <PhoneIcon />
          </button>
        </li>
      </ul>
    </Link>
  )
}
