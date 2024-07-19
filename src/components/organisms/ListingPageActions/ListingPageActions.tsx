'use client'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Dropdown,
  FiltersMenu,
} from '@/components'
import styles from './ListingPageActions.module.css'
import {
  HiOutlineFunnel as FilteringIcon,
  HiOutlineBarsArrowDown as SortingIcon,
} from 'react-icons/hi2'
import type { ListingPageActionsProps } from './ListingPageActions.types'
import { useState } from 'react'
import { useOfferParametersSuggestions } from '@/hooks'
import { getLabelTitleByKey, getLabelValuesByStrings } from '@/utils'
import type { OfferFilteringFormSchemaKey } from '@/schemas'

export const ListingPageActions = (props: ListingPageActionsProps) => {
  const { className, ...restProps } = props
  const [isFiltersMenuOpen, setFiltersMenuOpen] = useState(false)
  const [modelsQuery, setModelsQuery] = useState<string>()
  const suggestions = useOfferParametersSuggestions({ modelsQuery })

  return (
    <Container
      className={styles.container}
      {...restProps}
    >
      <FiltersMenu
        isOpen={isFiltersMenuOpen}
        setIsOpen={setFiltersMenuOpen}
      >
        {Object.entries(suggestions).map(([name, { data }]) => {
          const { label, title } = getLabelTitleByKey(
            name as OfferFilteringFormSchemaKey,
          )

          return (
            <FiltersMenu.Item
              key={name}
              name={name as OfferFilteringFormSchemaKey}
              label={label}
            >
              {({ register }) => (
                <CheckboxGroup
                  key={name}
                  name={name}
                  label={title}
                  items={getLabelValuesByStrings(data)}
                  itemProps={{
                    ...register(name as OfferFilteringFormSchemaKey),
                  }}
                  onChange={name === 'brands' ? setModelsQuery : undefined}
                />
              )}
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
  )
}
