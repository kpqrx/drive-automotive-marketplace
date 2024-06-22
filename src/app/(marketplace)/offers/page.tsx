'use client'
import {
  Breadcrumbs,
  Button,
  Container,
  FiltersMenu,
  Dropdown,
  OfferTile,
} from '@/components'
import { useState } from 'react'
import {
  HiOutlineFunnel as FilteringIcon,
  HiOutlineBarsArrowDown as SortingIcon,
} from 'react-icons/hi2'
import styles from '../../../styles/offers.module.css'

export default function Listing() {
  const [isFiltersMenuOpen, setFiltersMenuOpen] = useState(false)

  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Osobowe', path: '#' },
            { label: 'Coupe', path: '#' },
          ]}
        />
        <section className={styles.titleWrapper}>
          <h1 className={styles.title}>BMW</h1>
          <p className={styles.itemsCount}>5 ogłoszeń</p>
        </section>
      </Container>
      <Container className={styles.actionsWrapper}>
        <FiltersMenu
          isOpen={isFiltersMenuOpen}
          setIsOpen={setFiltersMenuOpen}
        />
        <Button
          className={styles.actionButton}
          variant="secondary"
          size="small"
          onClick={() => setFiltersMenuOpen(true)}
        >
          <FilteringIcon /> Filtrowanie
        </Button>
        <Dropdown
          className={styles.actionButton}
          items={[
            { label: 'Od najnowszego', callback: () => {} },
            { label: 'Cena od najniższej', callback: () => {} },
            { label: 'Cena od najwyższej', callback: () => {} },
            { label: 'Moc silnika od najniższej', callback: () => {} },
            { label: 'Moc silnika od najwyższej', callback: () => {} },
          ]}
          size="small"
          variant="secondary"
          align="end"
        >
          <SortingIcon /> Sortowanie
        </Dropdown>
      </Container>
      <Container
        as="ul"
        className={styles.itemsList}
      >
        <li>
          <OfferTile
            href="/offers/bmw-seria-6-2434523"
            label="BMW Seria 6"
            description="Shadowline, Akrapovic, komforty, polski salon"
            location="Poznań, wielkopolskie"
            price="180 000 PLN"
            thumbnailSrc="https://images.pexels.com/photos/951318/pexels-photo-951318.jpeg?auto=compress&cs=tinysrgb&w=1600"
            properties={['2019', '72 820 km', '3.0 V6', 'Benzyna', '315 KM']}
          />
        </li>
        <li>
          <OfferTile
            href="/offers/bmw-m6-2434523"
            label="BMW Seria 6"
            description="Shadowline, Akrapovic, komforty, polski salon"
            location="Poznań, wielkopolskie"
            price="180 000 PLN"
            thumbnailSrc="https://images.pexels.com/photos/951318/pexels-photo-951318.jpeg?auto=compress&cs=tinysrgb&w=1600"
            properties={['2019', '72 820 km', '3.0 V6', 'Benzyna', '315 KM']}
          />
        </li>
        <li>
          <OfferTile
            href="/offers/bmw-seria-6-2434523"
            label="BMW Seria 6"
            description="Shadowline, Akrapovic, komforty, polski salon"
            location="Poznań, wielkopolskie"
            price="180 000 PLN"
            thumbnailSrc="https://images.pexels.com/photos/951318/pexels-photo-951318.jpeg?auto=compress&cs=tinysrgb&w=1600"
            properties={['2019', '72 820 km', '3.0 V6', 'Benzyna', '315 KM']}
          />
        </li>
        <li>
          <OfferTile
            href="/offers/bmw-seria-6-2434523"
            label="BMW Seria 6"
            description="Shadowline, Akrapovic, komforty, polski salon"
            location="Poznań, wielkopolskie"
            price="180 000 PLN"
            thumbnailSrc="https://images.pexels.com/photos/951318/pexels-photo-951318.jpeg?auto=compress&cs=tinysrgb&w=1600"
            properties={['2019', '72 820 km', '3.0 V6', 'Benzyna', '315 KM']}
          />
        </li>
        <li>
          <OfferTile
            href="/offers/bmw-seria-6-2434523"
            label="BMW Seria 6"
            description="Shadowline, Akrapovic, komforty, polski salon"
            location="Poznań, wielkopolskie"
            price="180 000 PLN"
            thumbnailSrc="https://images.pexels.com/photos/951318/pexels-photo-951318.jpeg?auto=compress&cs=tinysrgb&w=1600"
            properties={['2019', '72 820 km', '3.0 V6', 'Benzyna', '315 KM']}
          />
        </li>
      </Container>
    </main>
  )
}
