'use client'
import {
  Button,
  Container,
  Dropdown,
  FiltersMenu,
  OfferTile,
} from '@/components'
import styles from './OffersListing.module.css'
import {
  HiOutlineFunnel as FilteringIcon,
  HiOutlineBarsArrowDown as SortingIcon,
} from 'react-icons/hi2'
import type { OffersListingProps } from './OffersListing.types'
import { useMemo, useState } from 'react'
import { useOfferParameters } from '@/hooks'
import { getIconByManufacturer } from '@/utils'
import useSWR from 'swr'
import { getOffers } from '@/lib'

export const OffersListing = (props: OffersListingProps) => {
  const { className, ...restProps } = props

  const [isFiltersMenuOpen, setFiltersMenuOpen] = useState(false)
  const { parameters } = useOfferParameters()

  const offers = useSWR(parameters, () => getOffers(parameters))

  const memoizedOffersData = useMemo(() => offers.data, [offers.data])

  return (
    <>
      <Container
        className={styles.container}
        {...restProps}
      >
        <FiltersMenu
          isOpen={isFiltersMenuOpen}
          setIsOpen={setFiltersMenuOpen}
        />

        <div className={styles.buttonsWrapper}>
          <Button
            className={styles.button}
            variant="secondary"
            size="small"
            onClick={() => setFiltersMenuOpen(true)}
          >
            <FilteringIcon /> Filtrowanie
          </Button>

          <Dropdown
            className={styles.button}
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
        </div>
      </Container>
      <Container
        as="ul"
        className={styles.itemsList}
      >
        {offers.isLoading ? (
          <p>Ładowanie...</p>
        ) : (
          memoizedOffersData?.map((offer) => (
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
          ))
        )}
      </Container>
    </>
  )
}
