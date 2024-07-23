'use client'
import {
  Button,
  Chip,
  Container,
  Dropdown,
  FiltersMenu,
  OfferTile,
  Skeleton,
} from '@/components'
import styles from './OffersListing.module.css'
import {
  HiOutlineFunnel as FilteringIcon,
  HiOutlineBarsArrowDown as SortingIcon,
} from 'react-icons/hi2'
import type { OffersListingProps } from './OffersListing.types'
import { useState } from 'react'
import {
  getIconByManufacturer,
  isEmptyOfferParameterValue,
  mapKeyToLabel,
} from '@/utils'
import { LiaCarCrashSolid as ErrorIcon } from 'react-icons/lia'
import { useOfferParameters, useOffers } from '@/hooks'

export const OffersListing = (props: OffersListingProps) => {
  const { className, ...restProps } = props

  const [isFiltersMenuOpen, setFiltersMenuOpen] = useState(false)

  const { offers } = useOffers()
  const { parameters } = useOfferParameters()

  const activeFilters = Object.entries(parameters)
    .filter(([, value]) => !isEmptyOfferParameterValue(value))
    .map(([key]) => mapKeyToLabel(key))

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

        {activeFilters.length > 0 && (
          <div className={styles.filterItemsListWrapper}>
            {offers.isLoading ? (
              <Skeleton className={styles.activeFiltersSkeleton} />
            ) : (
              <>
                Aktywne filtry:
                <ul className={styles.filterItemsList}>
                  {activeFilters.map((filter) => (
                    <li key={filter}>
                      <Chip className={styles.filterItem}>{filter}</Chip>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        <div className={styles.buttonsWrapper}>
          <Button
            className={styles.button}
            variant="secondary"
            size="small"
            onClick={() => setFiltersMenuOpen(true)}
          >
            <FilteringIcon /> Filtrowanie
          </Button>

          {/* TODO: To implement */}
          {/* <Dropdown
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
          </Dropdown> */}
        </div>
      </Container>
      {offers.isLoading && (
        <Container>
          <Skeleton
            count={3}
            className={styles.skeleton}
          />
        </Container>
      )}

      {offers.data && offers.data.length > 0 && (
        <Container
          as="ul"
          className={styles.itemsList}
        >
          {offers.data.map((offer) => (
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
      )}

      {offers.data?.length === 0 && (
        <Container className={styles.errorWrapper}>
          <ErrorIcon className={styles.errorIcon} />
          <p>Nie znaleziono ofert. Dopasuj parametry wyszukiwania</p>
        </Container>
      )}

      {offers.error && (
        <Container className={styles.errorWrapper}>
          <ErrorIcon className={styles.errorIcon} />
          <p>Wystąpił błąd podczas ładowania ofert</p>
        </Container>
      )}
    </>
  )
}
