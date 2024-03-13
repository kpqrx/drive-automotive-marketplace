'use client'
import {
  TabsDirection,
  type TabsProps,
} from '@/components/molecules/Tabs/Tabs.types'
import clsx from 'clsx'
import type { Transition, Variants } from 'framer-motion'
import { m, AnimatePresence } from 'framer-motion'
import { useMemo, useState } from 'react'
import styles from './Tabs.module.css'
import * as TabsPrimitive from '@radix-ui/react-tabs'

// TODO: Framer motion left/right slide animation

const variants: Variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? '100%' : '-100%',
    }
  },
  center: {
    zIndex: 1,
    x: 0,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
    }
  },
}

const transition: Transition = {
  type: 'spring',
  damping: 30,
  stiffness: 250,
  mass: 1.25,
}

export const Tabs = (props: TabsProps) => {
  const { items, defaultItem = 0, ...restProps } = props

  const itemsWithValues = useMemo(() => {
    return items.map((item, index) => ({
      ...item,
      value: `${item.label}-${index}`,
    }))
  }, [items])

  const [currentValue, setCurrentValue] = useState(
    itemsWithValues[defaultItem].value,
  )
  const [direction, setDirection] = useState(TabsDirection.Right)

  const handleValueChange = (newValue: string) => {
    const newItemIndex = itemsWithValues.findIndex(
      (item) => item.value === newValue,
    )
    const currentItemIndex = itemsWithValues.findIndex(
      (item) => item.value === currentValue,
    )
    const newDirection =
      newItemIndex > currentItemIndex ? TabsDirection.Right : TabsDirection.Left

    setCurrentValue(newValue)
    setDirection(newDirection)
  }

  return (
    <TabsPrimitive.Root
      className={styles.container}
      value={currentValue}
      onValueChange={(value) => handleValueChange(value)}
      {...restProps}
    >
      <TabsPrimitive.List className={styles.buttonsWrapper}>
        {itemsWithValues.map(({ label, value, disabled }) => (
          <TabsPrimitive.Trigger
            key={value}
            value={value}
            disabled={disabled}
            className={clsx(styles.button, [
              currentValue === value && styles.buttonActive,
            ])}
          >
            <span className={styles.buttonContentWrapper}>{label}</span>
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      <div className={styles.contentWrapper}>
        {itemsWithValues.map(({ content, value }) => (
          <AnimatePresence
            initial={false}
            custom={direction}
            mode="wait"
            key={value}
          >
            {currentValue === value && (
              <TabsPrimitive.Content
                value={value}
                asChild
                forceMount
              >
                <m.div
                  className={styles.content}
                  key={value}
                  custom={direction}
                  variants={variants}
                  transition={transition}
                  animate="center"
                  initial="enter"
                  exit="exit"
                >
                  {content}
                </m.div>
              </TabsPrimitive.Content>
            )}
          </AnimatePresence>
        ))}
      </div>
    </TabsPrimitive.Root>
  )
}
