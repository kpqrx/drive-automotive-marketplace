import { Chip } from '@/components'
import { Modal } from '@/components/molecules/Modal/Modal'
import type {
  FiltersMenuItemType,
  FiltersMenuProps,
} from '@/components/organisms/FiltersMenu/FiltersMenu.types'
import clsx from 'clsx'
import type { Transition, Variants } from 'framer-motion'
import { m, AnimatePresence } from 'framer-motion'
import { useMemo, useState } from 'react'
import {
  HiOutlineChevronLeft as ChevronLeftIcon,
  HiOutlineChevronRight as ChevronRightIcon,
  HiOutlineXMark as CloseIcon,
  HiOutlineTrash as TrashIcon,
} from 'react-icons/hi2'
import styles from './FiltersMenu.module.css'

const menuTransition: Transition = {
  type: 'spring',
  damping: 30,
  stiffness: 250,
  mass: 1.25,
}

const menuVariants: Variants = {
  inLeft: {
    x: '-100%',
  },
  inRight: {
    x: '100%',
  },
  out: {
    x: 0,
  },
}

const MOCK_MENU_ITEMS: FiltersMenuItemType[] = [
  {
    id: 1,
    title: 'Producent',
    content: 'producent pojazdu siema',
    value: 'BMW',
  },
  { id: 2, title: 'Model', content: 'model pojazdu siema', value: 'M6' },
  { id: 3, title: 'Generacja', content: 'generacja pojazdu siema' },
  { id: 4, title: 'Rok produkcji', content: 'rok produkcji pojazdu siema' },
  {
    id: 5,
    title: 'Cena',
    content: 'cena pojazdu siema',
    value: '+80k PLN',
  },
]

export const FiltersMenu = (props: FiltersMenuProps) => {
  const { isOpen, setIsOpen, items = MOCK_MENU_ITEMS, ...restProps } = props

  const [selectedMenu, setSelectedMenu] = useState<FiltersMenuItemType | null>(
    null,
  )

  const handleMenuSelection = (menuId: number | null) => {
    const menuById = items.find(({ id }) => id === menuId)
    setSelectedMenu(menuById ?? null)
  }

  const handleActiveFilterClick = (menuId: number | null) => {
    handleMenuSelection(menuId)
    setIsOpen(true)
  }

  const setIsOpenWithMenuReset = (state: boolean) => {
    setIsOpen(state)
    setSelectedMenu(null)
  }

  const activeItems = useMemo(() => items.filter(({ value }) => value), [items])

  return (
    <>
      {activeItems && (
        <div className={styles.activeFiltersWrapper}>
          <span className={styles.activeFiltersTitle}>Aktywne filtry:</span>
          <ul className={styles.activeFiltersItemsList}>
            {activeItems.map(({ id, title, value }) => (
              <li key={id}>
                <button onClick={() => handleActiveFilterClick(id)}>
                  <Chip className={styles.activeFilterItem}>
                    {title}: {value}
                  </Chip>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpenWithMenuReset}
        title={selectedMenu ? selectedMenu.title : 'Filtrowanie wyników'}
        renderBeforeTitle={
          <button
            className={styles.closeButton}
            onClick={() =>
              selectedMenu ? handleMenuSelection(null) : setIsOpen(false)
            }
          >
            {selectedMenu ? <ChevronLeftIcon /> : <CloseIcon />}
          </button>
        }
        renderAfterTitle={
          <button className={styles.iconButton}>
            <TrashIcon /> Wyczyść
          </button>
        }
        {...restProps}
      >
        <AnimatePresence
          mode="popLayout"
          initial={false}
        >
          {selectedMenu !== null ? (
            <m.div
              className={styles.contentWrapper}
              key={`filter-menu-${selectedMenu.id}`}
              variants={menuVariants}
              transition={menuTransition}
              animate="out"
              initial={selectedMenu ? 'inRight' : 'inLeft'}
              exit={selectedMenu ? 'inRight' : 'inLeft'}
            >
              {selectedMenu.content}
            </m.div>
          ) : (
            <m.ul
              className={clsx(styles.contentWrapper, styles.itemsList)}
              key="menus-list"
              variants={menuVariants}
              transition={menuTransition}
              animate="out"
              initial={selectedMenu ? 'inRight' : 'inLeft'}
              exit={selectedMenu ? 'inRight' : 'inLeft'}
            >
              {items.map(({ id, title, value }) => (
                <li key={id}>
                  <button
                    className={styles.item}
                    onClick={() => handleMenuSelection(id)}
                  >
                    <span className={styles.itemTitle}>
                      {title}&nbsp;
                      {value && <span className={styles.changesIndicator} />}
                    </span>
                    <ChevronRightIcon />
                  </button>
                </li>
              ))}
            </m.ul>
          )}
        </AnimatePresence>
      </Modal>
    </>
  )
}
