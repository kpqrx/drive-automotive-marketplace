import type { ModalProps } from '@/components/molecules/Modal/Modal.types'
import { Dialog } from '@headlessui/react'
import styles from './Modal.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import type { Variants, Transition, PanInfo } from 'framer-motion'
import {useBreakpoint} from '@/hooks'
import { useCallback } from 'react'

const panelVariantsMobile: Variants = {
  hidden: {
    y: '100%',
  },
  visible: {
    y: 0,
  },
}

const panelVariantsDesktop: Variants = {
  hidden: {
    x: '100%',
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

const panelTransition: Transition = {
  type: 'spring',
  damping: 30,
  stiffness: 250,
  mass: 1.25,
}

export const Modal = (props: ModalProps) => {
  const {
    isOpen,
    setIsOpen,
    children,
    title,
    renderBeforeTitle,
    renderAfterTitle,
    ...restProps
  } = props

  const isDesktop = useBreakpoint(1024)

  const handlePanelDrag = useCallback(
    (event: TouchEvent, { offset }: PanInfo) => {
      const { x, y } = offset

      if ((isDesktop ? x : y) > 200) {
        setIsOpen(false)
      }
    },
    [isDesktop, setIsOpen],
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          {...restProps}
        >
          <Dialog.Panel
            className={styles.container}
            as={motion.div}
            variants={isDesktop ? panelVariantsDesktop : panelVariantsMobile}
            animate="visible"
            initial="hidden"
            exit="hidden"
            transition={panelTransition}
            drag={isDesktop ? 'x' : 'y'}
            dragConstraints={{
              [isDesktop ? 'left' : 'top']: 0,
              [isDesktop ? 'right' : 'bottom']: 0,
            }}
            dragElastic={0.8}
            dragTransition={{
              bounceStiffness: 800,
              bounceDamping: 25,
            }}
            onDragEnd={handlePanelDrag}
          >
            <div className={styles.titleWrapper}>
              {renderBeforeTitle && renderBeforeTitle}
              <Dialog.Title
                as="h2"
                className={styles.title}
              >
                {title}
              </Dialog.Title>
              {renderAfterTitle && renderAfterTitle}
            </div>
            <div className={styles.contentWrapper}>{children}</div>
          </Dialog.Panel>
          <motion.div
            variants={backdropVariants}
            animate="visible"
            initial="hidden"
            exit="hidden"
            className={styles.backdrop}
          />
        </Dialog>
      )}
    </AnimatePresence>
  )
}
