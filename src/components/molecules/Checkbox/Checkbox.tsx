'use client'
import { CheckIcon } from '@/components'
import type { CheckboxProps } from '@/components/molecules/Checkbox/Checkbox.types'
import { ExclamationCircleIcon as ErrorIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { AnimatePresence, m, type Variants } from 'framer-motion'
import React, { forwardRef, type ChangeEventHandler } from 'react'
import styles from './Checkbox.module.css'
import { useFormContext } from 'react-hook-form'

const errorVariants: Variants = {
  hidden: { opacity: 0, y: '-50%', height: 0 },
  visible: { opacity: 1, y: 0, height: 'auto' },
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      children,
      className = '',
      error = '',
      onChange,
      name,
      value,
      defaultChecked = false,
      ...restProps
    } = props

    const [isChecked, setIsChecked] = React.useState(defaultChecked)

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      if (onChange) onChange(event)
      setIsChecked(event.target.checked)
    }

    return (
      <div className={clsx(className, styles.container)}>
        <label className={styles.wrapper}>
          <span
            className={clsx(
              styles.indicatorWrapper,
              isChecked && styles.indicatorWrapperChecked,
              error && styles.indicatorWrapperError,
            )}
          >
            {isChecked && <CheckIcon className={styles.indicator} />}
          </span>
          <span className={clsx(styles.label, error && styles.labelError)}>
            {children}
          </span>

          <input
            className={styles.input}
            ref={ref}
            type="checkbox"
            name={name}
            value={value}
            onChange={handleOnChange}
            {...restProps}
          />
        </label>

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
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'
