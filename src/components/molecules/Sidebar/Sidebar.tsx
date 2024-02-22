import { Button } from '@/components/atoms/Button/Button'
import { Logo } from '@/components/atoms/Logo/Logo'
import type { SidebarProps } from '@/components/molecules/Sidebar/Sidebar.types'
import { Dialog } from '@headlessui/react'
import clsx from 'clsx'
import { m } from 'framer-motion'
import type { Transition, Variants } from 'framer-motion'
import Link from 'next/link'
import {
  HiOutlinePlus as PlusIcon,
  HiOutlineUser as UserIcon,
} from 'react-icons/hi2'
import styles from './Sidebar.module.css'

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
  type: 'spring',
  damping: 30,
  stiffness: 250,
  mass: 1.25,
}

const linksWrapperVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.125,
      when: 'beforeChildren',
    },
  },
}

const linkVariants: Variants = {
  initial: { x: -40, opacity: 0 },
  animate: { x: 0, opacity: 1 },
}

const linkTransition: Transition = {
  type: 'spring',
  damping: 8,
  mass: 1.25,
}

export const Sidebar = (props: SidebarProps) => {
  const { isOpen, setIsOpen, items, className = '', ...restProps } = props

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Dialog.Panel
        as={m.nav}
        variants={sidebarVariants}
        animate="visible"
        initial="hidden"
        exit="hidden"
        transition={sidebarTransition}
        className={clsx(className, styles.container)}
        {...restProps}
      >
        <Logo initial={false} />
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
        <m.ul
          className={styles.navigationItems}
          variants={linksWrapperVariants}
          initial="initial"
          animate="animate"
        >
          {items.map(({ label, href }, i) => (
            <m.li
              className={styles.navigationItem}
              key={i}
              variants={linkVariants}
              transition={linkTransition}
            >
              <Link href={href}>{label}</Link>
            </m.li>
          ))}
        </m.ul>
      </Dialog.Panel>
      <m.div
        variants={backdropVariants}
        animate="visible"
        initial="hidden"
        exit="hidden"
        className={styles.backdrop}
        onClick={() => setIsOpen(false)}
      />
    </Dialog>
  )
}
