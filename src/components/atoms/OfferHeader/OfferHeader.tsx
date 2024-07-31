import React from 'react'
import clsx from 'clsx'
import type { OfferHeaderProps } from './OfferHeader.types'
import styles from './OfferHeader.module.css'

export const OfferHeader = (props: OfferHeaderProps) => {
  const {
    label: [labelPrimary, labelSecondary],
    icon: Icon,
    price,
    className = '',
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
      className={clsx(className, styles.container)}
      {...restProps}
    >
      <div className={styles.wrapper}>
        <Icon className={styles.icon} />
        <div className={styles.labelWrapper}>
          <p className={styles.labelPrimary}>{labelPrimary}</p>
          <p className={styles.labelSecondary}>{labelSecondary}</p>
        </div>
      </div>
      <p className={styles.price}>{formattedPrice}</p>
    </div>
  )
}
