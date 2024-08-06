import React, { useMemo, type MouseEventHandler } from 'react'
import styles from './OfferTile.module.css'
import type { OfferTileProps } from '@/components/molecules/OfferTile/OfferTile.types'
import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon as CommentsIcon,
  MapPinIcon,
  TrashIcon as DeleteIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid'
import { Chip } from '@/components/atoms/Chip/Chip'
import { useRouter } from 'next/navigation'

export const OfferTile = (props: OfferTileProps) => {
  const {
    href,
    label,
    title,
    location,
    price,
    icon,
    thumbnailSrc,
    properties,
    orientation = 'vertical',
    className = '',
    onLikeButtonClick,
    onDeleteButtonClick,
    withLikeButton = true,
    withDeleteButton = false,
    isLiked = false,
    ...restProps
  } = props

  const { replace } = useRouter()

  const formattedPrice = price.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    currencyDisplay: 'code',
    maximumFractionDigits: 0,
  })

  const Icon = useMemo(() => icon, [href])

  const handleCommentButtonClick: MouseEventHandler = (event) => {
    event.preventDefault()
    replace(`${href}#discussion`)
  }

  const handleLikeButtonClick: MouseEventHandler = (event) => {
    event.preventDefault()
    onLikeButtonClick?.()
  }

  const handleDeleteButtonClick: MouseEventHandler = (event) => {
    event.preventDefault()
    onDeleteButtonClick?.()
  }

  return (
    <Link
      href={href}
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
        <div className={styles.contentWrapper}>
          <div className={styles.labelWrapper}>
            <Icon className={styles.manufacturerIcon} />
            <h3 className={styles.label}>{label}</h3>
          </div>
          <span className={styles.price}>{formattedPrice}</span>
        </div>
        {title && <p className={styles.description}>{title}</p>}
        <div className={styles.propertiesWrapper}>
          {properties.map((property, i) => (
            <Chip key={i}>{property}</Chip>
          ))}
        </div>
        <span className={styles.location}>
          <MapPinIcon className={styles.mapPinIcon} />
          {location}
        </span>
        <ul className={styles.iconButtonsContainer}>
          {withLikeButton && (
            <li>
              <button
                className={styles.iconButton}
                onClick={handleLikeButtonClick}
              >
                {isLiked ? (
                  <HeartIconFilled className={styles.iconFilled} />
                ) : (
                  <HeartIcon />
                )}
              </button>
            </li>
          )}
          <li>
            <button
              className={styles.iconButton}
              onClick={handleCommentButtonClick}
            >
              <CommentsIcon />
            </button>
          </li>

          {withDeleteButton && (
            <li>
              <button
                className={styles.iconButton}
                onClick={handleDeleteButtonClick}
              >
                <DeleteIcon />
              </button>
            </li>
          )}
        </ul>
      </div>
    </Link>
  )
}
