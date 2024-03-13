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
import styles from '../../../styles/listing.module.css'

export default function Listing() {
  const [isFiltersMenuOpen, setFiltersMenuOpen] = useState(false)

  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Osobowe', path: '#' },
            { label: 'Limuzyna', path: '#' },
          ]}
        />
        <section className={styles.titleWrapper}>
          <h1 className={styles.title}>BMW M6</h1>
          <p className={styles.itemsCount}>3642 ogłoszeń</p>
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
            href="#"
            label="BMW M6"
            description="Shadowline, Akrapovic, komforty, polski salon"
            location="Poznań, wielkopolskie"
            price="180 000 PLN"
            thumbnailSrc="https://images.pexels.com/photos/951318/pexels-photo-951318.jpeg?auto=compress&cs=tinysrgb&w=1600"
            properties={['2019', '72 820 km', '4.4 L V8', 'Benzyna', '560 KM']}
          />
        </li>
        <li>
          <OfferTile
            href="#"
            label="BMW M6"
            description="Shadowline, Akrapovic, komforty, polski salon"
            location="Poznań, wielkopolskie"
            price="180 000 PLN"
            thumbnailSrc="https://images.pexels.com/photos/951318/pexels-photo-951318.jpeg?auto=compress&cs=tinysrgb&w=1600"
            properties={['2019', '72 820 km', '4.4 L V8', 'Benzyna', '560 KM']}
          />
        </li>
        <li>
          <OfferTile
            href="#"
            label="BMW M6"
            description="Shadowline, Akrapovic, komforty, polski salon"
            location="Poznań, wielkopolskie"
            price="180 000 PLN"
            thumbnailSrc="https://images.pexels.com/photos/951318/pexels-photo-951318.jpeg?auto=compress&cs=tinysrgb&w=1600"
            properties={['2019', '72 820 km', '4.4 L V8', 'Benzyna', '560 KM']}
          />
        </li>
        <li>
          <OfferTile
            href="#"
            label="BMW M6"
            description="Shadowline, Akrapovic, komforty, polski salon"
            location="Poznań, wielkopolskie"
            price="180 000 PLN"
            thumbnailSrc="https://images.pexels.com/photos/951318/pexels-photo-951318.jpeg?auto=compress&cs=tinysrgb&w=1600"
            properties={['2019', '72 820 km', '4.4 L V8', 'Benzyna', '560 KM']}
          />
        </li>
        <li>
          <OfferTile
            href="#"
            label="BMW M6"
            description="Shadowline, Akrapovic, komforty, polski salon"
            location="Poznań, wielkopolskie"
            price="180 000 PLN"
            thumbnailSrc="https://images.pexels.com/photos/951318/pexels-photo-951318.jpeg?auto=compress&cs=tinysrgb&w=1600"
            properties={['2019', '72 820 km', '4.4 L V8', 'Benzyna', '560 KM']}
          />
        </li>
      </Container>
    </main>
  )
}
