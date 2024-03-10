'use client'
import type { ComboboxProps } from '@/components/molecules/Combobox/Combobox.types'
import * as Popover from '@radix-ui/react-popover'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import clsx from 'clsx'
import { m, AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  HiChevronDown as ChevronIcon,
  HiMagnifyingGlass as SearchIcon,
  HiCheck as CheckIcon,
} from 'react-icons/hi2'
import styles from './Combobox.module.css'
import { Chip } from '@/components'

// TODO: Use Radix's `ScrollArea` primitive for selected items

export const Combobox = (props: ComboboxProps) => {
  const {
    label,
    placeholder = '',
    items,
    className = '',
    name,
    disabled,
    ...restProps
  } = props
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const selectRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    if (!selectRef.current?.options) {
      return
    }

    for (const option of selectRef.current.options) {
      option.selected = selectedValues.includes(option.value)
    }
  }, [items, selectedValues])

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

  const handleSelectItem = (value: string) => {
    setSelectedValues((prevValues) =>
      selectedValues.includes(value)
        ? prevValues.filter((selectedValue) => selectedValue !== value)
        : [...prevValues, value],
    )
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
        <Popover.Trigger
          className={clsx(styles.trigger, isOpen && styles.triggerActive)}
          disabled={disabled}
        >
          <span
            className={clsx(
              styles.label,
              (isOpen || selectedValues.length > 0) && styles.labelFloating,
            )}
          >
            {label}
          </span>
          <span
            className={clsx(
              styles.placeholder,
              isOpen && selectedValues.length === 0 && styles.placeholderShown,
            )}
          >
            {placeholder}
          </span>
          <m.div
            className={styles.chevronIconWrapper}
            animate={{ rotate: isOpen ? '180deg' : '0deg' }}
          >
            <ChevronIcon />
          </m.div>
          <m.ul
            layout
            className={styles.selectedItemsList}
          >
            <AnimatePresence mode="popLayout">
              {selectedValues.map((value) => {
                const item = items.find((item) => item.value === value)

                return item ? (
                  <m.li
                    layout="position"
                    key={item.value}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 12, opacity: 0 }}
                  >
                    <Chip>{item.label}</Chip>
                  </m.li>
                ) : null
              })}
            </AnimatePresence>
          </m.ul>
        </Popover.Trigger>
        <AnimatePresence>
          {isOpen && (
            <Popover.Content
              asChild
              forceMount
            >
              <m.div
                className={styles.popoverContainer}
                initial={{ opacity: 0, y: -32, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -32, height: 0 }}
              >
                <label className={styles.searchInputContainer}>
                  <span className={styles.searchInputLabel}>Search...</span>
                  <SearchIcon className={styles.searchInputIcon} />
                  <input
                    className={styles.searchInput}
                    placeholder="Search..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </label>
                <ScrollArea.Root type="scroll">
                  <ScrollArea.Viewport
                    asChild
                    className={styles.itemsContainerViewport}
                  >
                    <ul className={styles.itemsContainer}>
                      {filteredItems.map((item) => (
                        <li key={item.value}>
                          <button
                            className={clsx(
                              styles.item,
                              selectedValues.includes(item.value) &&
                                styles.selectedItem,
                            )}
                            onClick={() => handleSelectItem(item.value)}
                            aria-label={`${selectedValues.includes(item.value) ? 'Remove selection' : 'Select'}: ${item.label}`}
                          >
                            {item.label}
                            <AnimatePresence>
                              {selectedValues.includes(item.value) && (
                                <m.div
                                  className={styles.itemCheckIconWrapper}
                                  initial={{ x: -32 }}
                                  animate={{ x: 0 }}
                                  exit={{ x: -32 }}
                                >
                                  <CheckIcon className={styles.itemCheckIcon} />
                                </m.div>
                              )}
                            </AnimatePresence>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar className={styles.scrollAreaScrollbar}>
                    <ScrollArea.Thumb className={styles.scrollAreaThumb} />
                  </ScrollArea.Scrollbar>
                </ScrollArea.Root>
              </m.div>
            </Popover.Content>
          )}
        </AnimatePresence>
        <select
          hidden
          multiple
          ref={selectRef}
          name={name}
        >
          {items.map(({ value }) => (
            <option
              key={value}
              value={value}
            />
          ))}
        </select>
      </div>
    </Popover.Root>
  )
}
