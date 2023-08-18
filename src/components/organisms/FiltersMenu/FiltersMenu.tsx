import type { FiltersMenuProps } from '@/components/organisms/FiltersMenu/FiltersMenu.types'
import { Dialog } from '@headlessui/react'
import {
  HiOutlineChevronRight as ChevronRightIcon,
  HiOutlineXMark as CloseIcon,
  HiOutlineTrash as TrashIcon,
} from 'react-icons/hi2'
import styles from './FiltersMenu.module.css'
import { motion } from 'framer-motion'
import type { Variants, Transition, PanInfo } from 'framer-motion'

const panelVariants: Variants = {
  hidden: {
    y: '100%',
  },
  visible: {
    y: 0,
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

const panelTransition: Transition = {
  type: 'spring',
  damping: 30,
  stiffness: 250,
  mass: 1.25,
}

// const linksWrapperVariants: Variants = {
//   initial: { opacity: 0 },
//   animate: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.125,
//       when: 'beforeChildren',
//     },
//   },
// }

// const linkVariants: Variants = {
//   initial: { x: -40, opacity: 0 },
//   animate: { x: 0, opacity: 1 },
// }

// const linkTransition: Transition = {
//   type: 'spring',
//   damping: 8,
//   mass: 1.25,
// }

export const FiltersMenu = (props: FiltersMenuProps) => {
  const { isOpen, setIsOpen, ...restProps } = props

  const handlePanelDrag = (event: TouchEvent, info: PanInfo) => {
    if (info.offset.y > 200) {
      setIsOpen(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      {...restProps}
    >
      <Dialog.Panel
        className={styles.container}
        as={motion.div}
        variants={panelVariants}
        animate="visible"
        initial="hidden"
        exit="hidden"
        transition={panelTransition}
        drag="y"
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragElastic={0.8}
        dragTransition={{
          bounceStiffness: 800,
          bounceDamping: 25,
        }}
        onDragEnd={handlePanelDrag}
      >
        <div className={styles.titleWrapper}>
          <button
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon />
          </button>
          <Dialog.Title
            as="h2"
            className={styles.title}
          >
            Filtrowanie wyników
          </Dialog.Title>
          <button className={styles.iconButton}>
            <TrashIcon /> Wyczyść
          </button>
        </div>
        <ul className={styles.itemsList}>
          <li>
            <button className={styles.item}>
              <span className={styles.itemTitle}>
                Filter 1 <span className={styles.changesIndicator} />
              </span>
              <ChevronRightIcon />
            </button>
          </li>
          <li>
            <button className={styles.item}>
              <span className={styles.itemTitle}>Filter 2</span>
              <ChevronRightIcon />
            </button>
          </li>
          <li>
            <button className={styles.item}>
              <span className={styles.itemTitle}>
                Filter 3 <span className={styles.changesIndicator} />
              </span>
              <ChevronRightIcon />
            </button>
          </li>
          <li>
            <button className={styles.item}>
              <span className={styles.itemTitle}>Filter 4</span>
              <ChevronRightIcon />
            </button>
          </li>
          <li>
            <button className={styles.item}>
              <span className={styles.itemTitle}>Filter 5</span>
              <ChevronRightIcon />
            </button>
          </li>
        </ul>
      </Dialog.Panel>
      <motion.div
        variants={backdropVariants}
        animate="visible"
        initial="hidden"
        exit="hidden"
        className={styles.backdrop}
      />
    </Dialog>
  )
}
