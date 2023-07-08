import { Button } from '@/components/atoms/Button/Button'
import styles from './Header.module.css'
import type { HeaderProps } from '@/components/organisms/Header/Header.types'
import { HiBars3BottomLeft, HiPlus } from 'react-icons/hi2'

export const Header = (props: HeaderProps) => {
  return (
    <header
      className={styles.container}
      {...props}
    >
      <div className={styles.wrapper}>
        <button className={styles.navigationButton}>
          <HiBars3BottomLeft />
          <span className={styles.navigationButtonLabel}>
            Toggle navigation
          </span>
        </button>
        <Button size="small">
          <HiPlus />
          Sprzedaj pojazd
        </Button>
      </div>
    </header>
  )
}
