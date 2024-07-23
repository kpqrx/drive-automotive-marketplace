'use client'
import styles from './CheckboxGroup.module.css'
import type { CheckboxGroupProps } from './CheckboxGroup.types'
import { Controller, type FieldValues, type Path } from 'react-hook-form'
import { Checkbox } from '@/components'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

export const CheckboxGroup = <T extends FieldValues>(
  props: CheckboxGroupProps<T>,
) => {
  const { items, name, control, children, ...restProps } = props

  return (
    <div {...restProps}>
      {children}

      <ScrollAreaPrimitive.Root type="auto">
        <ScrollAreaPrimitive.Viewport className={styles.wrapper}>
          {items?.map((item) => (
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
    </div>
  )
}
