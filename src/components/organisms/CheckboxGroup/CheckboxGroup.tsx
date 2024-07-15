'use client'
import {
  Button,
  Checkbox,
  Container,
  Dropdown,
  FiltersMenu,
} from '@/components'
import styles from './CheckboxGroup.module.css'
import {
  HiOutlineFunnel as FilteringIcon,
  HiOutlineBarsArrowDown as SortingIcon,
} from 'react-icons/hi2'
import type { CheckboxGroupProps } from './CheckboxGroup.types'
import { useState } from 'react'

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { className, label, items, itemProps, ...restProps } = props

  return (
    <fieldset
      className={styles.container}
      {...restProps}
    >
      <legend className={styles.label}>{label}</legend>

      <div className={styles.items}>
        {items.map(({ name, value, label }) => (
          <Checkbox
            className={styles.item}
            key={value}
            name={name}
            value={value}
            {...itemProps}
          >
            {label}
          </Checkbox>
        ))}
      </div>
    </fieldset>
  )
}
