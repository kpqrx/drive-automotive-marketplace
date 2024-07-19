'use client'
import { Checkbox } from '@/components'
import styles from './CheckboxGroup.module.css'
import type { CheckboxGroupProps } from './CheckboxGroup.types'
import { useFormContext } from 'react-hook-form'
import type { ChangeEventHandler } from 'react'

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { className, label, items, name, itemProps, onChange, ...restProps } =
    props

  // This is workaround to get Checkbox working with react-hook-form
  const { onChange: registerOnChange, ...restItemProps } = itemProps ?? {}
  const { getValues } = useFormContext()
  const values = getValues(name ?? '') || []

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (onChange) onChange(event.target.value)
    if (registerOnChange) registerOnChange(event)
  }

  return (
    <fieldset
      className={styles.container}
      {...restProps}
    >
      <legend className={styles.label}>{label}</legend>

      <div className={styles.items}>
        {items.map(({ value, label }) => (
          <Checkbox
            className={styles.item}
            key={value}
            value={value}
            defaultChecked={values.includes(value)}
            onChange={handleOnChange}
            {...restItemProps}
          >
            {label}
          </Checkbox>
        ))}
      </div>
    </fieldset>
  )
}
