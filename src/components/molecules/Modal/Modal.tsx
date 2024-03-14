'use client'
import type { ModalProps } from '@/components/molecules/Modal/Modal.types'
import { useBreakpoint } from '@/hooks'
import type { PanInfo, Transition, Variants } from 'framer-motion'
import { m, AnimatePresence } from 'framer-motion'
import { useCallback } from 'react'
import styles from './Modal.module.css'
import * as Dialog from '@radix-ui/react-dialog'
import { HiOutlineXMark as CloseIcon } from 'react-icons/hi2'

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
    contextButtonLabel = <CloseIcon aria-label="Close modal" />,
    contextButtonCallback = () => setIsOpen(false),
    label,
    headerSlot,
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
    <Dialog.Root
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <m.div
                variants={backdropVariants}
                animate="visible"
                initial="hidden"
                exit="hidden"
                className={styles.backdrop}
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              {...restProps}
            >
              <m.div
                className={styles.container}
                variants={
                  isDesktop ? panelVariantsDesktop : panelVariantsMobile
                }
                animate="visible"
                initial="hidden"
                exit="hidden"
                transition={panelTransition}
                drag={isDesktop ? 'x' : 'y'}
                dragConstraints={{
                  [isDesktop ? 'left' : 'top']: 0,
                  [isDesktop ? 'right' : 'bottom']: 0,
                }}
                dragElastic={{
                  [isDesktop ? 'right' : 'bottom']: 1,
                  [isDesktop ? 'left' : 'top']: 0.125,
                }}
                dragTransition={{
                  bounceStiffness: 800,
                  bounceDamping: 25,
                }}
                onDragEnd={handlePanelDrag}
              >
                <div className={styles.headerWrapper}>
                  <button
                    onClick={contextButtonCallback}
                    className={styles.contextButton}
                  >
                    {contextButtonLabel}
                  </button>
                  <Dialog.Title asChild>
                    <h2 className={styles.title}>{label}</h2>
                  </Dialog.Title>
                  {headerSlot}
                </div>
                <div className={styles.contentWrapper}>{children}</div>
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
