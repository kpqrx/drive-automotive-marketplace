import styles from './Input.module.css'
import type { InputProps } from '@/components/molecules/Input/Input.types'
import clsx from 'clsx'

export const Input = (props: InputProps) => {
  const { label, className = '', ...restProps } = props

  return (
    <label
      className={clsx(styles.container, className)}
      data-testid="input"
    >
      <span
        className={styles.label}
        data-testid="input-label"
      >
        {label}
      </span>
      <input
        className={styles.input}
        data-testid="input-control"
        {...restProps}
      />
    </label>
  )
}
