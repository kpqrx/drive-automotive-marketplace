import React from 'react'
import styles from './Tabs.module.css'
import type { TabsProps } from '@/components/molecules/Tabs/Tabs.types'
import clsx from 'clsx'
import { Tab } from '@headlessui/react'

export const Tabs = (props: TabsProps) => {
  const { items, defaultActive = 0, ...restProps } = props

  return (
    <div
      className={styles.container}
      {...restProps}
    >
      <Tab.Group defaultIndex={defaultActive}>
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
                  {label}
                </Tab>
              ))}
            </>
          )}
        </Tab.List>
        <Tab.Panels className={styles.contentWrapper}>
          {items.map(({ content }, i) => (
            <Tab.Panel
              key={i}
              className={styles.content}
            >
              {content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
