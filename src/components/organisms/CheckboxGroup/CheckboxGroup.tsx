'use client'
import styles from './CheckboxGroup.module.css'
import type { CheckboxGroupProps } from './CheckboxGroup.types'
import { Controller, type FieldValues, type Path } from 'react-hook-form'
import { Checkbox, Skeleton } from '@/components'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { AnimatePresence, m, type Variants } from 'framer-motion'
import { ExclamationCircleIcon as ErrorIcon } from '@heroicons/react/24/outline'

const errorVariants: Variants = {
  hidden: { opacity: 0, y: '-50%', height: 0 },
  visible: { opacity: 1, y: 0, height: 'auto' },
}

export const CheckboxGroup = <T extends FieldValues>(
  props: CheckboxGroupProps<T>,
) => {
  const { items, name, control, children, error, ...restProps } = props

  return (
    <div {...restProps}>
      {children}

      {items.length === 0 ? (
        <Skeleton className="h-72 w-full" />
      ) : (
        <ScrollAreaPrimitive.Root type="auto">
          <ScrollAreaPrimitive.Viewport className={styles.wrapper}>
            {items.map((item) => (
              <Controller<T>
                key={item.value}
                name={name as Path<T>}
                control={control}
                render={({ field }) => {
                  const defaultChecked = Array.isArray(field.value)
                    ? field.value.includes(item.value)
                    : false

                  return (
                    <Checkbox
                      name={name}
                      className={styles.item}
                      defaultChecked={defaultChecked}
                      onCheckedChange={(checked) => {
                        const fieldValue = Array.isArray(field.value)
                          ? field.value
                          : []
                        const newFieldValue = checked
                          ? [...fieldValue, item.value]
                          : fieldValue.filter((v) => v !== item.value)

                        field.onChange({ target: { value: newFieldValue } })
                      }}
                    >
                      {item.label}
                    </Checkbox>
                  )
                }}
              />
            ))}
          </ScrollAreaPrimitive.Viewport>

          <ScrollAreaPrimitive.Scrollbar className={styles.scrollbar}>
            <ScrollAreaPrimitive.Thumb className={styles.thumb} />
          </ScrollAreaPrimitive.Scrollbar>
        </ScrollAreaPrimitive.Root>
      )}

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
}
