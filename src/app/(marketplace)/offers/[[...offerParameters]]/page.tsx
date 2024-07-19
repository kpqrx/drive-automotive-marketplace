import {
  Breadcrumbs,
  Container,
  ListingPageActions,
  OfferTile,
} from '@/components'
import styles from '@/styles/offers.module.css'
import { getOffers } from '@/lib'
import {
  getDeserializedOfferParameters,
  getIconByManufacturer,
  getOffersCount,
  getOffersPageTitle,
} from '@/utils'

type ListingPageProps = {
  params: {
    offerParameters: string[]
  }
}

export default async function ListingPage(props: ListingPageProps) {
  const {
    params: { offerParameters: serializedOfferParameter = [] },
  } = props

  const offerParameters = getDeserializedOfferParameters(
    serializedOfferParameter,
  )
  const {
    brands: [manufacturer] = [],
    models: [model] = [],
    bodyTypes: [bodyType] = [],
  } = offerParameters

  const offers = await getOffers(offerParameters)
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
              thumbnailSrc={offer.thumbnailUrl}
              properties={offer.properties}
            />
          </li>
        ))}
      </Container>
    </main>
  )
}
