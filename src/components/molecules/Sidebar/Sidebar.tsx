import styles from './Sidebar.module.css'
import type { SidebarProps } from '@/components/molecules/Sidebar/Sidebar.types'
import clsx from 'clsx'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button/Button'
import { motion } from 'framer-motion'
import type { Transition, Variants } from 'framer-motion'

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
  mass: 0.5,
  stiffness: 85,
  velocity: 1.5,
}

export const Sidebar = (props: SidebarProps) => {
  const { stateSetter, items, className = '', ...restProps } = props

  return (
    <>
      <motion.aside
        variants={sidebarVariants}
        animate="visible"
        initial="hidden"
        exit="hidden"
        transition={sidebarTransition}
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
      </motion.aside>
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
