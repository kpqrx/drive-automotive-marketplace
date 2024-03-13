'use client'

import { Button } from '@/components/atoms/Button/Button'
import styles from './Header.module.css'
import type { HeaderProps } from '@/components/organisms/Header/Header.types'
import { HiBars2 as MenuIcon, HiPlus as PlusIcon } from 'react-icons/hi2'
import { useCallback, useState } from 'react'
import { Sidebar } from '@/components/molecules/Sidebar/Sidebar'
import type { SidebarItemType } from '@/components/molecules/Sidebar/Sidebar.types'
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
    <>
      <header
        className={styles.container}
        {...props}
      >
        <Container className={styles.wrapper}>
          <Logo />
          <ul className={styles.buttonsWrapper}>
            <li className={styles.callToActionButton}>
              <Button
                size="small"
                variant="secondary"
              >
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
        </Container>
      </header>
      <Sidebar
        items={sidebarItems}
        isOpen={isSidebarVisible}
        setIsOpen={setSidebarVisible}
      />
    </>
  )
}
