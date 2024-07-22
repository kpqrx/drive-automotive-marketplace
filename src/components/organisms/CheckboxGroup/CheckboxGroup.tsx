'use client'
import styles from './CheckboxGroup.module.css'
import type { CheckboxGroupProps } from './CheckboxGroup.types'

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { className, label, items, name, itemProps, onChange, ...restProps } =
    props

  if (!items) return 'Wystąpił błąd'

  return (
    <fieldset
      className={styles.container}
      {...restProps}
    >
      <legend className={styles.label}>{label}</legend>

      <div className={styles.items}></div>
    </fieldset>
  )
}
