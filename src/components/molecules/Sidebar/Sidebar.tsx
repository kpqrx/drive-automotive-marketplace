'use client'
import { Button } from '@/components/atoms/Button/Button'
import { Logo } from '@/components/atoms/Logo/Logo'
import type { SidebarProps } from '@/components/molecules/Sidebar/Sidebar.types'
import clsx from 'clsx'
import { AnimatePresence, m } from 'framer-motion'
import type { Transition, Variants } from 'framer-motion'
import { HiOutlinePlus as PlusIcon } from 'react-icons/hi2'
import styles from './Sidebar.module.css'
import * as Dialog from '@radix-ui/react-dialog'
import { UserActionPanel } from '@/components/atoms/UserActionPanel/UserActionPanel'

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
  damping: 12,
  mass: 1.25,
}

export const Sidebar = (props: SidebarProps) => {
  const { isOpen, setIsOpen, items, className = '', ...restProps } = props

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Content asChild>
              <m.div
                variants={sidebarVariants}
                animate="visible"
                initial="hidden"
                exit="hidden"
                transition={sidebarTransition}
                className={clsx(className, styles.container)}
                {...restProps}
              >
                <Logo initial={false} />

                <UserActionPanel className={styles.userActionPanel} />

                <Button>
                  <PlusIcon />
                  Dodaj ogłoszenie
                </Button>
                {/* <m.ul
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
                </m.ul> */}
              </m.div>
            </Dialog.Content>
            <Dialog.Overlay asChild>
              <m.div
                variants={backdropVariants}
                animate="visible"
                initial="hidden"
                exit="hidden"
                className={styles.backdrop}
              />
            </Dialog.Overlay>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
