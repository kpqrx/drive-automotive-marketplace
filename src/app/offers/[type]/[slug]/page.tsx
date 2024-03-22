import styles from '@/styles/offer.module.css'
import { SiMercedes } from 'react-icons/si'
import { FireIcon } from '@heroicons/react/24/outline'
import {
  Breadcrumbs,
  OfferHeader,
  FeaturesList,
  ScrollGallery,
  Container,
} from '@/components'

export default function Home() {
  return (
    <main className="h-[800vh]">
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Osobowe', path: '#' },
            { label: 'Limuzyna', path: '#' },
          ]}
        />
        <OfferHeader
          className={styles.offerHeader}
          label={['Mercedes-Benz', 'AMG GT Coupe']}
          icon={SiMercedes}
          price="180 000 PLN"
        />

        <FeaturesList
          className={styles.offerFeatures}
          items={[
            { label: 'Silnik', value: '4.0 V8', icon: FireIcon },
            { label: 'Moc', value: '585 KM', icon: FireIcon },
            { label: 'Rodzaj paliwa', value: 'Benzyna', icon: FireIcon },
            { label: 'Przebieg', value: '100 000 km', icon: FireIcon },
            { label: 'Rok produkcji', value: '2021', icon: FireIcon },
          ]}
        />
      </Container>
      <ScrollGallery
        items={Array(8).fill({
          width: 1200,
          height: 800,
          alt: 'mercedes',
          src: 'https://images.pexels.com/photos/16511358/pexels-photo-16511358/free-photo-of-a-modern-blue-mercedes-amg-gt-r-parked-in-front-of-the-car-salon.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        })}
      />
      {/* Description */}
      {/* Discussion board */}
      {/* Contact and address */}
    </main>
  )
}
