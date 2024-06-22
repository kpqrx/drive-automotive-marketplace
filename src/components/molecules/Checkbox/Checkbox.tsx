'use client'
import React from 'react'
import styles from './Checkbox.module.css'
import type { CheckboxProps } from '@/components/molecules/Checkbox/Checkbox.types'
import clsx from 'clsx'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@/components'

export const Checkbox = (props: CheckboxProps) => {
  const {
    children,
    defaultChecked = false,
    className = '',
    ...restProps
  } = props
  const [isChecked, setIsChecked] = React.useState(defaultChecked)

  return (
    <CheckboxPrimitive.Root
      className={clsx(className, styles.container)}
      checked={isChecked}
      onCheckedChange={setIsChecked}
      asChild
      {...restProps}
    >
      <label>
        <span
          className={clsx(
            styles.indicatorWrapper,
            isChecked && styles.indicatorWrapperChecked,
          )}
        >
          <CheckboxPrimitive.Indicator>
            <CheckIcon className={styles.indicator} />
          </CheckboxPrimitive.Indicator>
        </span>
        <span className={styles.label}>{children}</span>
      </label>
    </CheckboxPrimitive.Root>
  )
}
