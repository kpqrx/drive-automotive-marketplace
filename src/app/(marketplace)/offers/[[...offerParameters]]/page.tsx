import { Breadcrumbs, Container, OffersListing } from '@/components'
import styles from '@/styles/offers.module.css'
import {
  getDeserializedOfferParameters,
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

  const title = getOffersPageTitle({ manufacturer, model })
  const [offersCount, offersCountTerm] = getOffersCount([]) // TOOD: fetch count
  const breadcrumbsItems = ['Osobowe'].filter(Boolean).map((label) => ({
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

      <OffersListing />
    </main>
  )
}
