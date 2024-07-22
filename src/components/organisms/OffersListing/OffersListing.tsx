'use client'
import {
  Button,
  Checkbox,
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
import { useOfferParameters, useOfferParametersSuggestions } from '@/hooks'
import { getIconByManufacturer, getLabelTitleByKey } from '@/utils'
import useSWR from 'swr'
import { getOffers } from '@/lib'
import type { OfferParameterKey, OfferParameters } from '@/types'

export const OffersListing = (props: OffersListingProps) => {
  const { className, ...restProps } = props

  const [isFiltersMenuOpen, setFiltersMenuOpen] = useState(false)
  const { parameters, setAllParameters, setParameter } = useOfferParameters()

  const modelsQuery = parameters?.brands?.[0]
  const suggestions = useOfferParametersSuggestions({
    modelsQuery,
  })
  const offers = useSWR(parameters, () => getOffers(parameters))

  const memoizedOffersData = useMemo(() => offers.data, [offers.data])

  const handleSubmit = (data: OfferParameters) => {
    setAllParameters(data)
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
          onSubmit={handleSubmit}
        >
          {Object.entries(suggestions).map(([name, { data }]) => {
            const { label } = getLabelTitleByKey(name)

            return (
              <FiltersMenu.Item
                key={name}
                name={name as OfferParameterKey}
                label={label}
              >
                {data?.map((item) => (
                  <Checkbox
                    key={item.value ?? item.id}
                    value={item.value ?? item.id}
                    defaultChecked={
                      Array.isArray(parameters[name as OfferParameterKey])
                        ? // @ts-ignore
                          parameters[name].includes(item.value || item.id)
                        : false
                    }
                    onCheckedChange={(checked) => {
                      const fieldValue =
                        parameters[name as OfferParameterKey] ?? []
                      const newFieldValue = checked
                        ? [...fieldValue, item.value ?? item.id]
                        : fieldValue.filter(
                            (value: any) => value !== (item.value ?? item.id),
                          )

                      setParameter(name as OfferParameterKey, newFieldValue)

                      return checked
                    }}
                  >
                    {item.label}
                  </Checkbox>
                ))}
              </FiltersMenu.Item>
            )
          })}
        </FiltersMenu>

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
