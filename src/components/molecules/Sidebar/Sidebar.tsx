import React from 'react'
import styles from './Sidebar.module.css'
import type { SidebarProps } from '@/components/molecules/Sidebar/Sidebar.types'
import clsx from 'clsx'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button/Button'

export const Sidebar = (props: SidebarProps) => {
  const { stateSetter, items, className = '', ...restProps } = props

  return (
    <>
      <aside
        className={clsx(className, styles.container)}
        {...restProps}
      >
        <ul className={styles.itemsList}>
          <li className={styles.item}>
            <Button className={styles.button}>Sprzedaj pojazd</Button>
          </li>
          {items.map(({ icon: Icon, label, href }, i) => (
            <li
              key={i}
              className={styles.item}
            >
              <Link
                href={href}
                className={styles.link}
              >
                <Icon className={styles.icon} />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <div
        className={styles.backdrop}
        onClick={() => stateSetter(false)}
      />
    </>
  )
}
