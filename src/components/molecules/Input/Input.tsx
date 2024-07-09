'use client'
import styles from './Input.module.css'
import type { InputProps } from '@/components/molecules/Input/Input.types'
import { mergeRefs } from '@/utils'
import { ExclamationCircleIcon as ErrorIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { AnimatePresence, m } from 'framer-motion'
import type { Variants } from 'framer-motion'
import {
  useCallback,
  useState,
  type FocusEventHandler,
  forwardRef,
  useEffect,
  useRef,
} from 'react'

type EventHandlerType = FocusEventHandler<HTMLInputElement>

const errorVariants: Variants = {
  hidden: { opacity: 0, y: '-50%', height: 0 },
  visible: { opacity: 1, y: 0, height: 'auto' },
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, forwardedRef) => {
    const {
      label,
      className = '',
      onFocus,
      onBlur,
      defaultValue,
      error,
      ...restProps
    } = props
    const [isLabelFloating, setIsLabelFloating] = useState(
      defaultValue !== undefined,
    )
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
      if (inputRef.current && inputRef.current.value) {
        setIsLabelFloating(true)
      }
    }, [])

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
      <m.label
        layout
        className={clsx(styles.container, className)}
        data-testid="input"
      >
        <span
          className={clsx(
            styles.label,
            isLabelFloating && styles.labelFloating,
            error && styles.labelError,
          )}
          data-testid="input-label"
        >
          {label}
        </span>
        <input
          ref={mergeRefs(inputRef, forwardedRef)}
          className={clsx(
            styles.input,
            isLabelFloating && styles.inputPlaceholderShown,
            error && styles.inputError,
          )}
          data-testid="input-control"
          onBlur={handleBlur}
          onFocus={handleFocus}
          defaultValue={defaultValue}
          {...restProps}
        />
        <AnimatePresence>
          {error && (
            <m.p
              className={styles.error}
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <span className={styles.errorWrapper}>
                <ErrorIcon />
                {error}
              </span>
            </m.p>
          )}
        </AnimatePresence>
      </m.label>
    )
  },
)
Input.displayName = 'Input'
