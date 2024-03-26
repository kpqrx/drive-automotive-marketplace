import React from 'react'
import styles from './Breadcrumbs.module.css'
import type { BreadcrumbsProps } from '@/components/atoms/Breadcrumbs/Breadcrumbs.types'
import clsx from 'clsx'
import Link from 'next/link'
import { HomeIcon } from '@heroicons/react/24/outline'

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const {
    items,
    isLastItemHighlighted = false,
    className = '',
    ...restProps
  } = props

  return (
    <div className={clsx(className, styles.container)}>
      <span className={clsx(styles.item, styles.homeItem)}>
        <Link href="/">
          <HomeIcon className={styles.homeIcon} />
        </Link>
      </span>
      <ul
        className={styles.list}
        data-testid="Breadcrumbs"
        {...restProps}
      >
        {items.map(({ label, path }, i) => (
          <li
            key={i}
            className={clsx(
              styles.item,
              i === items.length - 1 &&
                isLastItemHighlighted &&
                styles.highlightedItem,
            )}
          >
            <Link href={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
