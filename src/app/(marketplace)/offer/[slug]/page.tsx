import {
  Breadcrumbs,
  CollapsibleFeaturesList,
  Container,
  DiscussionCallToAction,
  FeaturesList,
  OfferDescription,
  OfferHeader,
  PhotoGallery,
} from '@/components'
import { ContactInfo } from '@/components/molecules/ContactInfo/ContactInfo'
import { getOfferBySlug, getOffers } from '@/lib'
import styles from '@/styles/offer.module.css'
import { getIconByManufacturer } from '@/utils'
import { FireIcon } from '@heroicons/react/24/outline'

export async function generateStaticParams() {
  const offers = await getOffers()
  const params = offers.map(({ slug }) => {
    slug
  })

  return params
}

type OfferPageProps = {
  params: { slug: string }
}

export default async function OfferPage(props: OfferPageProps) {
  const { params } = props

  const data = await getOfferBySlug(params.slug)

  return (
    <main className={styles.container}>
      <Container className={styles.wrapper}>
        <Breadcrumbs
          items={[
            { label: 'Osobowe', path: '#' },
            { label: 'Limuzyna', path: '#' },
          ]}
        />
        <OfferHeader
          className={styles.offerHeader}
          label={[data.manufacturer, data.model]}
          icon={getIconByManufacturer(data.manufacturer)}
          price={data.price}
        />

        <FeaturesList
          className={styles.offerFeatures}
          // TODO: get from data
          items={[
            { label: 'Silnik', value: '3.0 V6', icon: FireIcon },
            { label: 'Moc', value: '315 KM', icon: FireIcon },
            { label: 'Rodzaj paliwa', value: 'Benzyna', icon: FireIcon },
            { label: 'Przebieg', value: '72 820 km', icon: FireIcon },
            { label: 'Rok produkcji', value: '2019', icon: FireIcon },
          ]}
        />
        <PhotoGallery
          items={data.images.map((src) => ({
            src,
            width: 1200,
            height: 800,
            alt: `${data.manufacturer} ${data.model}`,
          }))}
        />

        <OfferDescription data={data.description} />
        <CollapsibleFeaturesList
          // TODO: get from data
          items={[
            {
              label: 'Komfort',
              items: [
                'Podgrzewane fotele przednie',
                'Podgrzewane fotele tylne',
                'Dostęp bezkluczykowy',
                'Automatyczne domykanie drzwi',
                'Skórzana tapicerka',
                'Czterostrefowa klimatyzacja',
              ],
            },
            {
              label: 'Bezpieczeństwo',
              items: [
                'System ochrony pieszych',
                'Systemy wspomagania kierowcy',
                'Detekcja zmęczenia kierowcy',
                'Asystent pasa ruchu',
                'Asystent parkowania',
                'System monitorowania martwego pola',
              ],
            },
            {
              label: 'Osiągi i wydajność',
              items: [
                'Sportowy filtr stożkowy',
                'Ceramiczne hamulce',
                'Sportowe zawieszenie',
                'Wyczynowe oprogramowanie silnika',
              ],
            },
          ]}
        />
        <DiscussionCallToAction />
        <ContactInfo
          firstName={data.user.name}
          lastName={data.user.surname}
          phoneNumber={data.user.phone}
          address={{
            city: data.user.city,
            voivodeship: data.user.voivodeship,
            // 🤔 💩
            lat: data.long.toString(),
            long: data.lat.toString(),
          }}
        />
      </Container>
    </main>
  )
}
