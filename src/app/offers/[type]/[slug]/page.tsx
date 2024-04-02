// TODO: Investigate why lack of this directive causes error
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
import { SiMercedes } from 'react-icons/si'

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
        <PhotoGallery
          items={Array(8).fill({
            width: 1200,
            height: 800,
            alt: 'mercedes',
            src: 'https://images.pexels.com/photos/16511358/pexels-photo-16511358/free-photo-of-a-modern-blue-mercedes-amg-gt-r-parked-in-front-of-the-car-salon.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
                'Podgrzewane fotele przednie',
                'Podgrzewane fotele tylne',
                'Dostęp bezkluczykowy',
                'Automatyczne domykanie drzwi',
                'Skórzana tapicerka',
                'Czterostrefowa klimatyzacja',
              ],
            },
            {
              label: 'Osiągi i wydajność',
              items: [
                'Podgrzewane fotele przednie',
                'Podgrzewane fotele tylne',
                'Dostęp bezkluczykowy',
                'Automatyczne domykanie drzwi',
                'Skórzana tapicerka',
                'Czterostrefowa klimatyzacja',
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
