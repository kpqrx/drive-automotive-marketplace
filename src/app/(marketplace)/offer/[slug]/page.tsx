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
import { PiEngine as EngineIcon } from 'react-icons/pi'
import { IoSpeedometerOutline as PowerIcon } from 'react-icons/io5'
import { BsFuelPump as FuelIcon } from 'react-icons/bs'
import { BiTachometer as MileageIcon } from 'react-icons/bi'
import { MdOutlineDateRange as ProductionYearIcon } from 'react-icons/md'
import { useOfferParametersSuggestions } from '@/hooks'

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
          items={[
            {
              label: 'Silnik',
              value: data.properties.engine,
              icon: EngineIcon,
            },
            { label: 'Moc', value: data.properties.power, icon: PowerIcon },
            {
              label: 'Rodzaj paliwa',
              value: data.properties.fuelType,
              icon: FuelIcon,
            },
            {
              label: 'Przebieg',
              value: data.properties.mileage,
              icon: MileageIcon,
            },
            {
              label: 'Rok produkcji',
              value: data.properties.productionYear,
              icon: ProductionYearIcon,
            },
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
          items={[
            {
              label: 'Wspomaganie kierowcy',
              items: data.features.driverAssistance,
            },
            {
              label: 'Bezpieczeństwo',
              items: data.features.safety,
            },
            {
              label: 'Multimedia',
              items: data.features.multimedia,
            },
            {
              label: 'Osiągi i wydajność',
              items: data.features.performance,
            },
            {
              label: 'Inne wyposażenie',
              items: data.features.other,
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
