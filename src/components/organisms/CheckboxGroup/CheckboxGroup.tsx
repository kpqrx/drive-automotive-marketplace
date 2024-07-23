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
              key={item.id}
              name={name as Path<T>}
              control={control}
              render={({ field }) => {
                const value = 'value' in item ? item.value : item.id
                const defaultChecked = Array.isArray(field.value)
                  ? field.value.includes(value)
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
                        ? [...fieldValue, value]
                        : fieldValue.filter((v) => v !== value)

                      field.onChange({ target: { value: newFieldValue } })
                      // field.onChange(newFieldValue)
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
