import styles from './Sidebar.module.css'
import type { SidebarProps } from '@/components/molecules/Sidebar/Sidebar.types'
import clsx from 'clsx'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button/Button'
import { motion } from 'framer-motion'
import type { Transition, Variants } from 'framer-motion'
import { Logo } from '@/components/atoms/Logo/Logo'
import {
  HiOutlinePlus as PlusIcon,
  HiOutlineUser as UserIcon,
} from 'react-icons/hi2'

const sidebarVariants: Variants = {
  hidden: {
    x: '-100%',
  },
  visible: {
    x: 0,
  },
}

const backdropVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

const sidebarTransition: Transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.25,
}

export const Sidebar = (props: SidebarProps) => {
  const { stateSetter, items, className = '', ...restProps } = props

  return (
    <>
      <motion.nav
        variants={sidebarVariants}
        animate="visible"
        initial="hidden"
        exit="hidden"
        transition={sidebarTransition}
        className={clsx(className, styles.container)}
        {...restProps}
      >
        <Logo />
        <div className={styles.userActions}>
          <span className={styles.userActionsIconWrapper}>
            <UserIcon className={styles.userActionsIcon} />
          </span>
          <span className={styles.userActionsLinksWrapper}>
            <Link
              href=""
              className={styles.userActionsLink}
            >
              Zaloguj się
            </Link>
            &nbsp;lub&nbsp;
            <Link
              href=""
              className={styles.userActionsLink}
            >
              Zarejestuj się
            </Link>
          </span>
        </div>
        <Button>
          <PlusIcon />
          Dodaj ogłoszenie
        </Button>
        <ul className={styles.navigationItems}>
          {items.map(({ label, href }, i) => (
            <li
              key={i}
              className={styles.navigationItem}
            >
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </motion.nav>
      <motion.div
        variants={backdropVariants}
        animate="visible"
        initial="hidden"
        exit="hidden"
        className={styles.backdrop}
        onClick={() => stateSetter(false)}
      />
    </>
  )
}
