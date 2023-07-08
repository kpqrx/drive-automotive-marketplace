import styles from './Combobox.module.css'
import type {
  ComboboxProps,
  ComboboxItemType,
} from '@/components/organisms/Combobox/Combobox.types'
import { Combobox as HCombobox } from '@headlessui/react'
import { useMemo, useState } from 'react'
import { HiChevronDown, HiXMark } from 'react-icons/hi2'
import clsx from 'clsx'

export const Combobox = (props: ComboboxProps) => {
  const {
    label,
    placeholder = '',
    items,
    clearLabel = 'Clear',
    ...restProps
  } = props
  const [selectedItem, setSelectedItem] = useState<ComboboxItemType | null>(
    null,
  )
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

  return (
    <HCombobox
      value={selectedItem}
      onChange={setSelectedItem}
      nullable
      {...restProps}
    >
      {({ open, value }) => (
        <div className={styles.container}>
          <HCombobox.Button
            as="div"
            className={styles.inputWrapper}
          >
            <HCombobox.Label className={styles.label}>{label}</HCombobox.Label>
            <HCombobox.Input
              className={clsx(styles.input, 'peer')}
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(item: ComboboxItemType) => item?.label}
              placeholder={placeholder}
            />
            <span
              className={clsx(
                styles.iconWrapper,
                'peer-disabled:bg-neutral-100 peer-disabled:border-neutral-300 peer-disabled:cursor-not-allowed',
              )}
            >
              <HiChevronDown
                className={clsx(styles.icon, [open && styles.iconRotated])}
              />
            </span>
          </HCombobox.Button>
          <HCombobox.Options className={styles.itemsContainer}>
            {value && (
              <li>
                <button
                  className={clsx(styles.item, styles.clearButton)}
                  onClick={() => setSelectedItem(null)}
                >
                  {clearLabel}
                  <HiXMark className={styles.clearIcon} />
                </button>
              </li>
            )}
            {filteredItems.map((item, i) => (
              <HCombobox.Option
                key={i}
                value={item}
              >
                {({ selected, active }) => (
                  <span
                    className={clsx(styles.item, [
                      selected && styles.itemSelected,
                      active && styles.itemActive,
                    ])}
                  >
                    {item.label}
                  </span>
                )}
              </HCombobox.Option>
            ))}
          </HCombobox.Options>
        </div>
      )}
    </HCombobox>
  )
}
