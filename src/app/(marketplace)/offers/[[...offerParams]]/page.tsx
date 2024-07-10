import {
  Breadcrumbs,
  Container,
  ListingPageActions,
  OfferTile,
} from '@/components'
import styles from '@/styles/offers.module.css'
import type { FilterParameters } from '@/types'
import { getFilteredOffers } from '@/lib'
import {
  getIconByManufacturer,
  getOffersCount,
  getOffersPageTitle,
} from '@/utils'
import type { ComponentProps } from 'react'

type ListingPageProps = {
  params: {
    offerParams: string[]
  }
  searchParams: Omit<FilterParameters, 'brands' | 'models' | 'bodyTypes'>
}

export default async function ListingPage(props: ListingPageProps) {
  const {
    params: { offerParams = [] },
    searchParams = [],
  } = props
  const [manufacturer, model, bodyType] = offerParams

  const filterParameters: FilterParameters = {
    brands: [manufacturer],
    models: [model],
    bodyTypes: [bodyType],
    ...searchParams,
  }

  const offers = await getFilteredOffers(filterParameters)
  const title = getOffersPageTitle({ manufacturer, model })
  const [offersCount, offersCountTerm] = getOffersCount(offers)
  const breadcrumbsItems = ['Osobowe', bodyType]
    .filter(Boolean)
    .map((label) => ({
      label,
      path: '/',
    }))

  return (
    <main>
      <Container>
        <Breadcrumbs items={breadcrumbsItems} />
        <section className={styles.titleWrapper}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.itemsCount}>
            {offersCount} {offersCountTerm}
          </p>
        </section>
      </Container>
      <ListingPageActions />
      <Container
        as="ul"
        className={styles.itemsList}
      >
        {offers.map((offer) => (
          <li key={offer.slug}>
            <OfferTile
              href={`/offer/${offer.slug}`}
              label={offer.label}
              icon={getIconByManufacturer(offer.manufacturer)}
              description={offer.description}
              location={offer.location}
              price={offer.price}
              thumbnailSrc="https://images.pexels.com/photos/951318/pexels-photo-951318.jpeg?auto=compress&cs=tinysrgb&w=1600"
              properties={offer.properties}
            />
          </li>
        ))}
      </Container>
    </main>
  )
}
