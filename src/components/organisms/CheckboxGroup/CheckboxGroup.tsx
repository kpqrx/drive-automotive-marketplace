'use client'
import { Checkbox } from '@/components'
import styles from './CheckboxGroup.module.css'
import type { CheckboxGroupProps } from './CheckboxGroup.types'
import { useFormContext } from 'react-hook-form'

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { className, label, items, name, itemProps, onChange, ...restProps } =
    props

  // This is workaround to get defaultChecked state
  const { getValues } = useFormContext()
  const values = getValues(name ?? '') || []

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
            {...itemProps}
          >
            {label}
          </Checkbox>
        ))}
      </div>
    </fieldset>
  )
}
