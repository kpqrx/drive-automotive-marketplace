'use client'

import { Button } from '@/components/atoms/Button/Button'
import styles from './Header.module.css'
import type { HeaderProps } from '@/components/organisms/Header/Header.types'
import { HiBars2 as MenuIcon, HiPlus as PlusIcon } from 'react-icons/hi2'
import { useCallback, useState } from 'react'
import { Sidebar } from '@/components/molecules/Sidebar/Sidebar'
import type { SidebarItemType } from '@/components/molecules/Sidebar/Sidebar.types'
import { Logo } from '@/components/atoms/Logo/Logo'
import clsx from 'clsx'
import { UserActionPanel } from '@/components/atoms/UserActionPanel/UserActionPanel'
import { ThemeToggleButton } from '@/components/molecules/ThemeToggleButton/ThemeToggleButton'

const sidebarItems: SidebarItemType[] = [
  { label: 'Obserwowane oferty', href: '#' },
  {
    label: 'Obserwowane wyszukiwania',
    href: '#',
  },
]

export const Header = (props: HeaderProps) => {
  const { label, className, withMenu = true, ...restProps } = props
  const [isSidebarVisible, setSidebarVisible] = useState(false)

  const handleSidebarToggle = useCallback(
    () => setSidebarVisible((prevState) => !prevState),
    [setSidebarVisible],
  )
  return (
    <>
      <header
        className={clsx(styles.container, className)}
        {...restProps}
      >
        <div className={styles.wrapper}>
          <Logo />
          {label && <h1 className={styles.label}>{label}</h1>}
          {withMenu && (
            <ul className={styles.buttonsWrapper}>
              <li>
                <UserActionPanel />
              </li>
              <li>
                <ThemeToggleButton />
              </li>
              <li className={styles.callToActionButton}>
                <Button
                  size="small"
                  href="/offers/add"
                >
                  <PlusIcon />
                  Dodaj ogłoszenie
                </Button>
              </li>
              <li className={styles.navigationButtonWrapper}>
                <button
                  className={styles.iconButton}
                  onClick={handleSidebarToggle}
                >
                  <MenuIcon />
                  <span className={styles.iconButtonLabel}>
                    Toggle navigation
                  </span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </header>
      <Sidebar
        items={sidebarItems}
        isOpen={isSidebarVisible}
        setIsOpen={setSidebarVisible}
      />
    </>
  )
}
