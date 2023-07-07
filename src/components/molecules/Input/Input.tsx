import React from 'react'
import styles from './Input.module.css'
import type { InputProps } from '@/components/molecules/Input/Input.types'
import clsx from 'clsx'

export const Input = (props: InputProps) => {
  const { label, className = '', ...restProps } = props

  return (
    <label className={clsx(styles.container, className)}>
      <span className={styles.label}>{label}</span>
      <input
        className={styles.input}
        {...restProps}
      />
    </label>
  )
}
