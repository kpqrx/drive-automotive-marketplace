'use client'
import type {
  ComboboxItemType,
  ComboboxProps,
} from '@/components/molecules/Combobox/Combobox.types'
import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx'
import { m, AnimatePresence } from 'framer-motion'
import { useMemo, useState } from 'react'
import {
  HiChevronDown as ChevronIcon,
  HiXMark as CloseIcon,
} from 'react-icons/hi2'
import styles from './Combobox.module.css'
import { Chip } from '@/components'

export const Combobox = (props: ComboboxProps) => {
  const {
    label,
    placeholder = '',
    items,
    clearLabel = 'Clear',
    className = '',
    ...restProps
  } = props
  const [selectedItems, setSelectedItems] = useState<ComboboxItemType[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  const filteredItems = useMemo(
    () =>
      items.filter(({ label }) =>
        label
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, '')),
      ),
    [query, items],
  )

  const handleSelectItem = (item: ComboboxItemType) => {
    setSelectedItems((prevItems) => [...prevItems, item])
  }

  return (
    <Popover.Root
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div
        className={clsx(className, styles.container)}
        {...restProps}
      >
        <Popover.Trigger className={styles.trigger}>
          <span
            className={clsx(
              styles.label,
              (isOpen || selectedItems.length > 0) && styles.labelFloating,
            )}
          >
            {label}
          </span>
          <ul className={styles.selectedItemsList}>
            {selectedItems.map((item) => (
              <li key={item.value}>
                <Chip>{item.label}</Chip>
              </li>
            ))}
          </ul>
        </Popover.Trigger>
        <AnimatePresence>
          {isOpen && (
            <Popover.Content
              asChild
              forceMount
            >
              <m.div
                className={styles.itemsContainer}
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
              >
                <input
                  placeholder={placeholder}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <ul>
                  {filteredItems.map((item) => (
                    <li
                      className={styles.item}
                      key={item.value}
                    >
                      <button onClick={() => handleSelectItem(item)}>
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </m.div>
            </Popover.Content>
          )}
        </AnimatePresence>
      </div>
    </Popover.Root>
  )
}
