'use client'
import type { SelectProps } from '@/components/molecules/Select/Select.types'
import * as SelectPrimitive from '@radix-ui/react-select'
import styles from './Select.module.css'
import { forwardRef, useMemo, useState } from 'react'
import clsx from 'clsx'
import { AnimatePresence, easeInOut, m } from 'framer-motion'
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

const MotionChevronDownIcon = m(ChevronDownIcon)

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (props, forwardedRef) => {
    const {
      label,
      placeholder = '',
      items,
      className = '',
      name,
      disabled,
      filterInputPlaceholder = 'Szukaj...',
      error,
      onSelect,
      onChange,
      required,
      defaultOpen = false,
      defaultValue = '',
      ...restProps
    } = props

    const [filterQuery, setFilterQuery] = useState('')
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const [value, setValue] = useState(defaultValue)
    const valueLabel = useMemo(
      () => items.find((item) => item.value === value)?.label,
      [items, value],
    )

    const filteredItems = useMemo(
      () =>
        items.filter((item) =>
          item.label.toLowerCase().includes(filterQuery.toLowerCase()),
        ),
      [items, filterQuery],
    )

    const handleFilterInputChange = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      setFilterQuery(event.target.value)
    }

    const handleOnValueChange = (value: string) => {
      if (onSelect) onSelect(value)
      if (onChange) onChange({ target: { name, value } })
      setValue(value)
    }

    return (
      <div className={clsx(styles.container, className)}>
        <SelectPrimitive.Root
          open={isOpen}
          onOpenChange={setIsOpen}
          value={value}
          onValueChange={handleOnValueChange}
          disabled={disabled}
          required={required}
          name={name}
          {...restProps}
        >
          <SelectPrimitive.Trigger
            className={clsx(styles.trigger, isOpen && styles.triggerActive)}
            ref={forwardedRef}
          >
            <span
              className={clsx(
                styles.label,
                (isOpen || value) && styles.labelFloating,
              )}
            >
              {label}
            </span>

            <span
              className={clsx(
                styles.placeholder,
                isOpen && !value && styles.placeholderShown,
              )}
            >
              {placeholder}
            </span>

            <span>{valueLabel}</span>

            <MotionChevronDownIcon
              className={styles.chevronIcon}
              animate={{ rotate: isOpen ? '180deg' : '0deg' }}
            />
          </SelectPrimitive.Trigger>

          <AnimatePresence>
            {isOpen && (
              <SelectPrimitive.Content
                asChild
                avoidCollisions={false}
                position="popper"
              >
                <m.div
                  className={styles.popoverContainer}
                  initial={{ opacity: 0, y: -24, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -24, height: 0 }}
                  transition={{ ease: easeInOut, duration: 0.15 }}
                >
                  <label className={styles.filterInputWrapper}>
                    <span className={styles.filterInputLabel}>Search...</span>
                    <MagnifyingGlassIcon
                      className={styles.magnifyingGlassIcon}
                    />
                    <input
                      className={styles.filterInput}
                      placeholder={filterInputPlaceholder}
                      value={filterQuery}
                      onChange={handleFilterInputChange}
                    />
                  </label>

                  <SelectPrimitive.Viewport asChild>
                    <ul className={styles.itemsContainer}>
                      {filteredItems.map((item) => (
                        <li key={item.value}>
                          <SelectPrimitive.Item
                            value={item.value}
                            className={styles.item}
                          >
                            <SelectPrimitive.ItemText>
                              {item.label}
                            </SelectPrimitive.ItemText>
                          </SelectPrimitive.Item>
                        </li>
                      ))}
                    </ul>
                  </SelectPrimitive.Viewport>
                </m.div>
              </SelectPrimitive.Content>
            )}
          </AnimatePresence>
        </SelectPrimitive.Root>
      </div>
    )
  },
)

Select.displayName = 'Select'
