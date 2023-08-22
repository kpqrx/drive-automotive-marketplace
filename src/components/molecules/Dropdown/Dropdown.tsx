import { Button } from '@/components'
import styles from './Dropdown.module.css'
import type { DropdownProps } from '@/components/molecules/Dropdown/Dropdown.types'
import { Menu as MenuPrimitive } from '@headlessui/react'
import clsx from 'clsx'
import { AnimatePresence, m } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useState } from 'react'
import { HiOutlineCheck as CheckIcon } from 'react-icons/hi2'

const itemsVariants: Variants = {
  hidden: {
    y: -24,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
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

export const Dropdown = (props: DropdownProps) => {
  const {
    children,
    items,
    defaultItemId = null,
    anchorPoint = 'left',
    className = '',
    buttonProps = {},
    activeButtonClassName = '',
    ...restProps
  } = props
  const { className: buttonClassName = '' } = buttonProps

  const [activeItemId, setActiveItemId] = useState(defaultItemId)

  const handleItemCallback = (id: any, callback: Function) => {
    setActiveItemId(id)
    callback()
  }

  return (
    <MenuPrimitive
      className={clsx(className, styles.container)}
      as="div"
      {...restProps}
    >
      {({ open }) => (
        <>
          <MenuPrimitive.Button
            as={Button}
            className={clsx(
              buttonClassName,
              open && activeButtonClassName,
              styles.button,
            )}
            {...buttonProps}
          >
            {children}
          </MenuPrimitive.Button>
          <AnimatePresence>
            {open && (
              <>
                <MenuPrimitive.Items
                  className={clsx(
                    styles.itemsWrapper,
                    anchorPoint === 'left' && styles.itemsWrapperLeft,
                    anchorPoint === 'right' && styles.itemsWrapperRight,
                  )}
                  as={m.ul}
                  variants={itemsVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {items.map(({ id, label, callback }) => (
                    <MenuPrimitive.Item
                      as="li"
                      key={id}
                    >
                      {({ active }) => (
                        <button
                          className={clsx(
                            styles.item,
                            active && styles.activeItem,
                          )}
                          onClick={() => handleItemCallback(id, callback)}
                        >
                          {label}&nbsp;{id === activeItemId && <CheckIcon />}
                        </button>
                      )}
                    </MenuPrimitive.Item>
                  ))}
                </MenuPrimitive.Items>
                <m.div
                  variants={backdropVariants}
                  animate="visible"
                  initial="hidden"
                  exit="hidden"
                  className={styles.backdrop}
                />
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </MenuPrimitive>
  )
}
