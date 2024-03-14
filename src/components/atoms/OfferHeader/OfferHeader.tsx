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
      <p className={styles.price}>{price}</p>
    </div>
  )
}
