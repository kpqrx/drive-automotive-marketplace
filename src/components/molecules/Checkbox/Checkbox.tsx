'use client'
import React from 'react'
import styles from './Checkbox.module.css'
import type { CheckboxProps } from '@/components/molecules/Checkbox/Checkbox.types'
import clsx from 'clsx'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@/components'
import { type Variants, AnimatePresence, m } from 'framer-motion'
import { ExclamationCircleIcon as ErrorIcon } from '@heroicons/react/24/outline'
import { set, useForm } from 'react-hook-form'

const errorVariants: Variants = {
  hidden: { opacity: 0, y: '-50%', height: 0 },
  visible: { opacity: 1, y: 0, height: 'auto' },
}

export const Checkbox = (props: CheckboxProps) => {
  const {
    children,
    defaultChecked = false,
    className = '',
    error = '',
    name,
    ...restProps
  } = props
  const [isChecked, setIsChecked] = React.useState(defaultChecked)
  const { setValue } = useForm()

  return (
    <CheckboxPrimitive.Root
      checked={isChecked}
      onCheckedChange={setIsChecked}
      name={name}
      onChange={() => name && setValue(name, isChecked)}
      asChild
      {...restProps}
    >
      <div className={clsx(className, styles.container)}>
        <label className={styles.wrapper}>
          <span
            className={clsx(
              styles.indicatorWrapper,
              isChecked && styles.indicatorWrapperChecked,
              error && styles.indicatorWrapperError,
            )}
          >
            <CheckboxPrimitive.Indicator>
              <CheckIcon className={styles.indicator} />
            </CheckboxPrimitive.Indicator>
          </span>
          <span className={clsx(styles.label, error && styles.labelError)}>
            {children}
          </span>
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
    </CheckboxPrimitive.Root>
  )
}
