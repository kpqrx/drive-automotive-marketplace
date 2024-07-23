/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { forwardRef, useEffect, useMemo, useState } from 'react'
import type { MultiselectProps } from '@/components/molecules/Multiselect/Multiselect.types'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import styles from './Multiselect.module.css'
import { AnimatePresence, easeInOut, m } from 'framer-motion'
import {
  ChevronDownIcon,
  XMarkIcon as ClearIcon,
} from '@heroicons/react/24/outline'
import { CheckIcon } from '@/components'
import clsx from 'clsx'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

const MotionChevronDownIcon = m(ChevronDownIcon)

export const Multiselect = forwardRef<HTMLButtonElement, MultiselectProps>(
  (props, forwardedRef) => {
    const {
      className,
      label,
      placeholder,
      items = [],
      defaultValue = [],
      onValueChange,
      defaultOpen = false,
      disabled,
      ...restProps
    } = props

    const [isOpen, setIsOpen] = useState(defaultOpen)
    const [searchQuery, setSearchQuery] = useState('')
    const [values, setValues] = useState<(string | number)[]>(defaultValue)

    const firstValueLabel = useMemo(
      () => items.find((item) => item.value === values[0])?.label,
      [items, values],
    )

    const filteredItems = useMemo(
      () =>
        items.filter((item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      [items, searchQuery],
    )

    const handleSetValues = (values: (string | number)[]) => {
      if (onValueChange) onValueChange(values)
      setValues(values)
    }

    const handleAddItem = (itemValue: string | number) =>
      handleSetValues([...values, itemValue])

    const handleRemoveItem = (itemValue: string | number) =>
      handleSetValues(values.filter((id) => id !== itemValue))

    const handleItemClick = (itemValue: string | number) =>
      values.includes(itemValue)
        ? handleRemoveItem(itemValue)
        : handleAddItem(itemValue)

    useEffect(() => {
      if (disabled) handleSetValues([])
    }, [disabled])

    return (
      <div className={clsx(styles.container, className)}>
        <PopoverPrimitive.Root
          open={isOpen}
          onOpenChange={setIsOpen}
          {...restProps}
        >
          <PopoverPrimitive.Trigger
            className={clsx(styles.trigger, isOpen && styles.triggerActive)}
            disabled={disabled}
            ref={forwardedRef}
          >
            <m.span
              className={styles.label}
              initial={false}
              animate={{
                y: isOpen || values.length > 0 ? -24 : 0,
                scale: isOpen || values.length > 0 ? 0.9 : 1,
              }}
            >
              {label}
            </m.span>

            {firstValueLabel && (
              <div className={styles.valueWrapper}>
                <span className={styles.valueLabel}>{firstValueLabel}</span>
                {values.length > 1 && (
                  <span className={styles.valuesCountBadge}>
                    + {values.length - 1}
                  </span>
                )}
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {isOpen && (
                <m.input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                  placeholder={placeholder}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </AnimatePresence>

            <div className={styles.iconsWrapper}>
              <AnimatePresence>
                {values.length > 0 && (
                  <m.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSetValues([])
                    }}
                    className={styles.clearButton}
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: '0%', opacity: 1 }}
                    exit={{ x: '100%', opacity: 0 }}
                  >
                    <ClearIcon className={styles.clearIcon} />
                  </m.button>
                )}
              </AnimatePresence>

              <MotionChevronDownIcon
                className={styles.chevronIcon}
                animate={{ rotate: isOpen ? '180deg' : '0deg' }}
              />
            </div>
          </PopoverPrimitive.Trigger>

          <AnimatePresence>
            {isOpen && (
              <PopoverPrimitive.Content
                asChild
                avoidCollisions={false}
                forceMount
              >
                <m.div
                  className={styles.content}
                  initial={{ opacity: 0, y: -24, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -24, height: 0 }}
                  transition={{ ease: easeInOut, duration: 0.15 }}
                >
                  <ScrollAreaPrimitive.Root type="auto">
                    <ScrollAreaPrimitive.Viewport
                      className={styles.contentWrapper}
                    >
                      {items.length === 0 ? (
                        <p>Ładowanie...</p>
                      ) : (
                        <ul className={styles.itemsContainer}>
                          {filteredItems.map((item) => (
                            <li key={item.value}>
                              <button
                                type="button"
                                className={styles.item}
                                onClick={() => handleItemClick(item.value)}
                              >
                                {values.includes(item.value) && (
                                  <CheckIcon className={styles.checkIcon} />
                                )}

                                <span>{item.label}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </ScrollAreaPrimitive.Viewport>

                    <ScrollAreaPrimitive.Scrollbar className={styles.scrollbar}>
                      <ScrollAreaPrimitive.Thumb className={styles.thumb} />
                    </ScrollAreaPrimitive.Scrollbar>
                  </ScrollAreaPrimitive.Root>
                </m.div>
              </PopoverPrimitive.Content>
            )}
          </AnimatePresence>
        </PopoverPrimitive.Root>
      </div>
    )
  },
)

Multiselect.displayName = 'Multiselect'
