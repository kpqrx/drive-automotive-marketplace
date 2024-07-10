'use client'
import { Button, Container, Dropdown, FiltersMenu } from '@/components'
import styles from './ListingPageActions.module.css'
import {
  HiOutlineFunnel as FilteringIcon,
  HiOutlineBarsArrowDown as SortingIcon,
} from 'react-icons/hi2'
import type { ListingPageActionsProps } from './ListingPageActions.types'
import { useState } from 'react'

export const ListingPageActions = (props: ListingPageActionsProps) => {
  const { className, ...restProps } = props
  const [isFiltersMenuOpen, setFiltersMenuOpen] = useState(false)

  return (
    <Container
      className={styles.container}
      {...restProps}
    >
      <FiltersMenu
        isOpen={isFiltersMenuOpen}
        setIsOpen={setFiltersMenuOpen}
      />
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
    </Container>
  )
}
