import styles from './Input.module.css'
import type { InputProps } from '@/components/molecules/Input/Input.types'
import clsx from 'clsx'
import { on } from 'events'
import {
  useCallback,
  useState,
  type ReactEventHandler,
  type FocusEventHandler,
} from 'react'

type EventHandlerType = FocusEventHandler<HTMLInputElement>

export const Input = (props: InputProps) => {
  const {
    label,
    className = '',
    onFocus,
    onBlur,
    defaultValue,
    ...restProps
  } = props
  const [isLabelFloating, setIsLabelFloating] = useState(
    defaultValue !== undefined,
  )

  const handleFocus = useCallback<EventHandlerType>(
    (event) => {
      setIsLabelFloating(true)
      onFocus && onFocus(event)
    },
    [onFocus, setIsLabelFloating],
  )

  const handleBlur = useCallback<EventHandlerType>(
    (event) => {
      const hasValue = event.target.value.length > 0
      setIsLabelFloating(hasValue)
      onBlur && onBlur(event)
    },
    [onBlur, setIsLabelFloating],
  )

  return (
    <label
      className={clsx(styles.container, className)}
      data-testid="input"
    >
      <span
        className={clsx(styles.label, isLabelFloating && styles.labelFloating)}
        data-testid="input-label"
      >
        {label}
      </span>
      <input
        className={clsx(
          styles.input,
          isLabelFloating && styles.inputPlaceholderShown,
        )}
        data-testid="input-control"
        onBlur={handleBlur}
        onFocus={handleFocus}
        defaultValue={defaultValue}
        {...restProps}
      />
    </label>
  )
}
