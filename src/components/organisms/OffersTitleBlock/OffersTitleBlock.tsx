'use client'
import { Breadcrumbs, Container, Skeleton } from '@/components'
import styles from './OffersTitleBlock.module.css'

import type { OffersTitleBlockProps } from './OffersTitleBlock.types'
import { useOfferParameters, useOffers } from '@/hooks'
import { getOffersCountTerm, getOffersPageTitle } from '@/utils'

export const OffersTitleBlock = (props: OffersTitleBlockProps) => {
  const { parameters } = useOfferParameters()
  const { brands, models } = parameters
  const { offers, offersCount } = useOffers()

  const title = getOffersPageTitle({ brands, models })
  const offersCountTerm = getOffersCountTerm(offersCount)

  return (
    <Container {...props}>
      <Breadcrumbs items={[{ label: 'Osobowe', path: '/' }]} />
      {offers.isLoading ? (
        <>
          <Skeleton className={styles.skeleton} />
          <Skeleton className={styles.skeleton} />
        </>
      ) : (
        <section className={styles.titleWrapper}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.itemsCount}>
            {offersCount} {offersCountTerm}
          </p>
        </section>
      )}
    </Container>
  )
}
