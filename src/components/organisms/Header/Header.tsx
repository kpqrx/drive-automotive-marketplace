'use client'

import { Button } from '@/components/atoms/Button/Button'
import styles from './Header.module.css'
import type { HeaderProps } from '@/components/organisms/Header/Header.types'
import {
  HiBars3BottomRight as MenuIcon,
  HiPlus as PlusIcon,
} from 'react-icons/hi2'
import { useCallback, useState } from 'react'
import { Sidebar } from '@/components/molecules/Sidebar/Sidebar'
import type { SidebarItemType } from '@/components/molecules/Sidebar/Sidebar.types'
import { AnimatePresence } from 'framer-motion'
import { Container } from '@/components/atoms/Container/Container'
import { Logo } from '@/components/atoms/Logo/Logo'

const sidebarItems: SidebarItemType[] = [
  { label: 'Obserwowane oferty', href: '#' },
  {
    label: 'Obserwowane wyszukiwania',
    href: '#',
  },
]

export const Header = (props: HeaderProps) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false)

  const handleSidebarToggle = useCallback(
    () => setSidebarVisible((prevState) => !prevState),
    [setSidebarVisible],
  )
  return (
    <Container className={styles.container}>
      <AnimatePresence>
        {isSidebarVisible && (
          <Sidebar
            items={sidebarItems}
            isOpen={isSidebarVisible}
            setIsOpen={setSidebarVisible}
          />
        )}
      </AnimatePresence>
      <header
        className={styles.wrapper}
        {...props}
      >
        <div className={styles.innerWrapper}>
          <Logo />
          <ul className={styles.buttonsWrapper}>
            <li className={styles.callToActionButton}>
              <Button size="small">
                <PlusIcon />
                Dodaj ogłoszenie
              </Button>
            </li>
            <li>
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
        </div>
      </header>
    </Container>
  )
}
