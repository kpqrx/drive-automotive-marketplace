'use client'

import { Button } from '@/components/atoms/Button/Button'
import styles from './Header.module.css'
import type { HeaderProps } from '@/components/organisms/Header/Header.types'
import {
  HiBars3BottomLeft,
  HiPlus,
  HiOutlineUser,
  HiOutlineUserPlus,
  HiOutlineStar,
  HiOutlineMagnifyingGlassCircle,
} from 'react-icons/hi2'
import { useCallback, useState } from 'react'
import { Sidebar } from '@/components/molecules/Sidebar/Sidebar'
import type { SidebarItemType } from '@/components/molecules/Sidebar/Sidebar.types'

const sidebarItems: SidebarItemType[] = [
  { icon: HiOutlineUser, label: 'Zaloguj się', href: '#' },
  { icon: HiOutlineUserPlus, label: 'Zarejestruj się', href: '#' },
  { icon: HiOutlineStar, label: 'Obserwowane oferty', href: '#' },
  {
    icon: HiOutlineMagnifyingGlassCircle,
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
      {isSidebarVisible && (
        <Sidebar
          items={sidebarItems}
          stateSetter={setSidebarVisible}
        />
      )}
      <header
        className={styles.container}
        {...props}
      >
        <div className={styles.wrapper}>
          <button
            className={styles.sidebarButton}
            onClick={handleSidebarToggle}
          >
            <HiBars3BottomLeft />
            <span className={styles.sidebarButtonLabel}>Toggle navigation</span>
          </button>
          <Button size="small">
            <HiPlus />
            Sprzedaj pojazd
          </Button>
        </div>
      </header>
    </>
  )
}
