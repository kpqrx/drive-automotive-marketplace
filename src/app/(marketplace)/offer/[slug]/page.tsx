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
import styles from '@/styles/offer.module.css'
import { FireIcon } from '@heroicons/react/24/outline'
import { SiBmw } from 'react-icons/si'

export default function Home() {
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
          label={['BMW Seria 6', 'Gran Coupe']}
          icon={SiBmw}
          price="180 000 PLN"
        />

        <FeaturesList
          className={styles.offerFeatures}
          items={[
            { label: 'Silnik', value: '3.0 V6', icon: FireIcon },
            { label: 'Moc', value: '315 KM', icon: FireIcon },
            { label: 'Rodzaj paliwa', value: 'Benzyna', icon: FireIcon },
            { label: 'Przebieg', value: '72 820 km', icon: FireIcon },
            { label: 'Rok produkcji', value: '2019', icon: FireIcon },
          ]}
        />
        <PhotoGallery
          items={Array(8).fill({
            width: 1200,
            height: 800,
            alt: 'bmw',
            src: 'https://images.pexels.com/photos/951318/pexels-photo-951318.jpeg?auto=compress&cs=tinysrgb&w=1600',
          })}
        />

        <OfferDescription />
        <CollapsibleFeaturesList
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
          firstName="Rafał"
          lastName="Kowalski"
          phoneNumber="123 456 789"
          address={{
            street: 'ul. Mostowa 1',
            city: 'Poznań',
            postalCode: '61-001',
            lat: '52.4047088',
            long: '16.9370952',
          }}
        />
      </Container>
    </main>
  )
}
