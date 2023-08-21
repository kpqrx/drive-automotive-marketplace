'use client'
import type { TabsProps } from '@/components/molecules/Tabs/Tabs.types'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import type { Transition, Variants } from 'framer-motion'
import { m, AnimatePresence, wrap } from 'framer-motion'
import { useState } from 'react'
import styles from './Tabs.module.css'

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
  const { items, defaultActive = 0, ...restProps } = props
  const [[currentIndex, direction], setState] = useState([0, 0])

  const handleTabChange = (newTabIndex: number) => {
    const newDirection = newTabIndex > tabIndex ? 1 : -1

    setState([newTabIndex, newDirection])
  }

  const tabIndex = wrap(0, items.length, currentIndex)

  return (
    <div
      className={styles.container}
      {...restProps}
    >
      <Tab.Group
        defaultIndex={defaultActive}
        selectedIndex={tabIndex}
        onChange={(index) => handleTabChange(index)}
      >
        <Tab.List className={styles.buttonsWrapper}>
          {({ selectedIndex }) => (
            <>
              {items.map(({ label }, index) => (
                <Tab
                  key={index}
                  className={clsx(styles.button, [
                    selectedIndex === index && styles.buttonActive,
                  ])}
                >
                  <span className={styles.buttonContentWrapper}>{label}</span>
                </Tab>
              ))}
            </>
          )}
        </Tab.List>
        <Tab.Panels className={styles.contentWrapper}>
          {items.map(({ content }, i) => (
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="wait"
              key={i}
            >
              {tabIndex === i && (
                <Tab.Panel
                  as={m.div}
                  className={styles.content}
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  transition={transition}
                  animate="center"
                  initial="enter"
                  exit="exit"
                  static
                >
                  {content}
                </Tab.Panel>
              )}
            </AnimatePresence>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
