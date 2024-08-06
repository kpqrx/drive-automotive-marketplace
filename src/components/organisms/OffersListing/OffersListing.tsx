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
import { useMemo, useState } from 'react'
import {
  getIconByManufacturer,
  isEmptyOfferParameterValue,
  mapKeyToLabel,
} from '@/utils'
import { LiaCarCrashSolid as ErrorIcon } from 'react-icons/lia'
import { useOfferParameters, useOffers, useToast } from '@/hooks'
import { addOfferToLiked, removeOfferFromLiked } from '@/lib'
import { useUserStore } from '@/store'

export const OffersListing = (props: OffersListingProps) => {
  const { className, ...restProps } = props

  const [isFiltersMenuOpen, setFiltersMenuOpen] = useState(false)

  const { offers } = useOffers()
  const { parameters } = useOfferParameters()
  const { userId } = useUserStore()

  const activeFilters = Object.entries(parameters)
    .filter(([, value]) => !isEmptyOfferParameterValue(value))
    .map(([key]) => mapKeyToLabel(key))

  // TODO: Extract sorting logic to a separate hook
  const [sortingKey, setSortingKey] = useState<
    'price-asc' | 'price-desc' | 'created-asc' | 'created-desc'
  >()
  const sortedOffers = useMemo(() => {
    switch (sortingKey) {
      case 'price-asc':
        return offers.data?.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return offers.data?.sort((a, b) => b.price - a.price)
      case 'created-desc':
        return offers.data?.reverse()
      case 'created-asc':
      default:
        return offers.data
    }
  }, [sortingKey, offers.data])

  const { toast } = useToast()

  const handleAddToLiked = async (offerId: number) => {
    try {
      // @ts-ignore
      await offers.mutate(addOfferToLiked(offerId), {
        optimisticData: (cachedOffers = []) => {
          const offer = offers.data?.find((offer) => offer.id === offerId)
          if (!offer) return cachedOffers

          return [
            ...cachedOffers,
            {
              ...offer,
              // @ts-ignore
              likedBy: [...(offer.likedBy ?? []), userId],
            },
          ]
        },
        populateCache: false,
      })
      toast({
        title: 'Oferta dodana do ulubionych',
        description: 'Możesz teraz szybko do niej wrócić',
        status: 'success',
      })
    } catch (error) {
      toast({
        title: 'Nie udało się dodać oferty do ulubionych',
        description: 'Sesja użytkownika wygasła, zaloguj się ponownie',
        status: 'error',
      })
    }
  }

  const handleRemoveFromLiked = async (offerId: number) => {
    try {
      // @ts-ignore
      await offers.mutate(removeOfferFromLiked(offerId), {
        optimisticData: (cachedOffers = []) => {
          const offer = offers.data?.find((offer) => offer.id === offerId)
          if (!offer) return cachedOffers

          return [
            ...cachedOffers,
            {
              ...offer,
              // @ts-ignore
              likedBy: [...(offer.likedBy ?? []), userId],
            },
          ]
        },
        populateCache: false,
      })
      toast({
        title: 'Oferta usunięta z ulubionych',
        status: 'success',
      })
    } catch (error) {
      toast({
        title: 'Nie udało się dodać oferty do ulubionych',
        description: 'Sesja użytkownika wygasła, zaloguj się ponownie',
        status: 'error',
      })
    }
  }

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

          <Dropdown
            className={styles.button}
            items={[
              {
                label: 'Od najnowszego',
                callback: () => setSortingKey('created-desc'),
              },
              {
                label: 'Od najstarszego',
                callback: () => setSortingKey('created-asc'),
              },
              {
                label: 'Cena od najniższej',
                callback: () => setSortingKey('price-asc'),
              },
              {
                label: 'Cena od najwyższej',
                callback: () => setSortingKey('price-desc'),
              },
            ]}
            size="small"
            variant="secondary"
            align="end"
          >
            <SortingIcon /> Sortowanie
          </Dropdown>
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

      {sortedOffers && sortedOffers.length > 0 && (
        <Container
          as="ul"
          className={styles.itemsList}
        >
          {sortedOffers.map((offer) => (
            <li key={offer.slug}>
              <OfferTile
                href={`/offer/${offer.slug}`}
                label={offer.label}
                icon={getIconByManufacturer(offer.manufacturer)}
                title={offer.summary}
                location={[offer.user.city, offer.user.voivodeship]
                  .filter(Boolean)
                  .join(', ')}
                price={offer.price}
                thumbnailSrc={offer.thumbnailUrl}
                properties={Object.values(offer.properties)}
                onLikeButtonClick={() =>
                  offer.likedBy?.includes(+userId)
                    ? handleRemoveFromLiked(offer.id)
                    : handleAddToLiked(offer.id)
                }
                isLiked={offer.likedBy?.includes(+userId)}
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
