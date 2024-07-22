'use client'
import type { SelectProps } from '@/components/molecules/Select/Select.types'
import * as SelectPrimitive from '@radix-ui/react-select'
import styles from './Select.module.css'
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { AnimatePresence, easeInOut, m } from 'framer-motion'
import {
  ChevronUpIcon,
  ChevronDownIcon,
  // MagnifyingGlassIcon,
  XMarkIcon as ClearIcon,
} from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/solid'

const MotionChevronDownIcon = m(ChevronDownIcon)

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (props, forwardedRef) => {
    const {
      label,
      placeholder = '',
      items = [],
      className = '',
      name,
      disabled,
      // filterInputPlaceholder = 'Szukaj...',
      error,
      onSelect,
      onChange,
      required,
      defaultOpen = false,
      defaultValue = '',
      isLoading,
      ...restProps
    } = props

    // const [filterQuery, setFilterQuery] = useState('')
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const [value, setValue] = useState(defaultValue)
    const valueLabel = useMemo(
      () => items.find((item) => item.value === value)?.label,
      [items, value],
    )

    // const filteredItems = useMemo(
    //   () =>
    //     items.filter((item) =>
    //       item.label.toLowerCase().includes(filterQuery.toLowerCase()),
    //     ),
    //   [items, filterQuery],
    // )

    // const handleFilterInputChange = (
    //   event: React.ChangeEvent<HTMLInputElement>,
    // ) => {
    //   setFilterQuery(event.target.value)
    // }

    const handleOnValueChange = useCallback(
      (value: string) => {
        if (onSelect) onSelect(value)
        if (onChange) onChange({ target: { name, value } })
        setValue(value)
      },
      [name, onChange, onSelect],
    )

    const handleClear = useCallback(() => {
      handleOnValueChange('')
    }, [handleOnValueChange])

    useEffect(() => {
      if (disabled) {
        handleClear()
      }
    }, [disabled, handleClear])

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
            data-testid="select-trigger"
          >
            <m.span
              className={styles.label}
              initial={false}
              animate={{
                y: isOpen || value ? -24 : 0,
                scale: isOpen || value ? 0.9 : 1,
              }}
            >
              {label}
            </m.span>

            <AnimatePresence mode="popLayout">
              {isOpen && !value && (
                <m.span
                  className={styles.placeholder}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {placeholder}
                </m.span>
              )}
            </AnimatePresence>

            {value && (
              <div className={styles.valueWrapper}>
                <AnimatePresence mode="popLayout">
                  {valueLabel && (
                    <m.span
                      className={styles.value}
                      key={valueLabel}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -12, opacity: 0 }}
                    >
                      {valueLabel}
                    </m.span>
                  )}
                </AnimatePresence>
              </div>
            )}

            <MotionChevronDownIcon
              className={styles.chevronIcon}
              animate={{ rotate: isOpen ? '180deg' : '0deg' }}
            />
          </SelectPrimitive.Trigger>

          <AnimatePresence>
            {value && (
              <m.button
                type="button"
                onClick={handleClear}
                className={styles.clearButton}
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: '0%', opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
              >
                <ClearIcon className={styles.clearIcon} />
              </m.button>
            )}
          </AnimatePresence>

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
                  {/* TODO: Resolve confict between typeahead functionality and filter input */}
                  {/* <label className={styles.filterInputWrapper}>
                    <span className={styles.filterInputLabel}>Search...</span>
                    <MagnifyingGlassIcon
                      className={styles.magnifyingGlassIcon}
                    />
                    <input
                      ref={filterInputRef}
                      className={styles.filterInput}
                      placeholder={filterInputPlaceholder}
                      value={filterQuery}
                      onChange={handleFilterInputChange}
                    />
                  </label> */}

                  <SelectPrimitive.ScrollUpButton
                    className={styles.scrollButton}
                  >
                    <ChevronUpIcon className={styles.scrollButtonIcon} />
                  </SelectPrimitive.ScrollUpButton>

                  <SelectPrimitive.Viewport asChild>
                    {items.length === 0 || isLoading ? (
                      <p>Ładowanie...</p>
                    ) : (
                      <ul className={styles.itemsContainer}>
                        {items.map((item) => (
                          <li key={item.id}>
                            <SelectPrimitive.Item
                              value={item.value ?? item.id}
                              className={styles.item}
                              data-testid="select-item"
                            >
                              <SelectPrimitive.ItemIndicator asChild>
                                <CheckIcon className={styles.checkIcon} />
                              </SelectPrimitive.ItemIndicator>
                              <SelectPrimitive.ItemText>
                                {item.label}
                              </SelectPrimitive.ItemText>
                            </SelectPrimitive.Item>
                          </li>
                        ))}
                      </ul>
                    )}
                  </SelectPrimitive.Viewport>

                  <SelectPrimitive.ScrollDownButton
                    className={styles.scrollButton}
                  >
                    <ChevronDownIcon className={styles.scrollButtonIcon} />
                  </SelectPrimitive.ScrollDownButton>
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
