import { Button, CheckIcon } from '@/components'
import styles from './Dropdown.module.css'
import type { DropdownProps } from '@/components/molecules/Dropdown/Dropdown.types'
import clsx from 'clsx'
import { AnimatePresence, m } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'

// TODO: Adjust styles and add check icon

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
    defaultItem = 0,
    align = 'start',
    className = '',
    ...restProps
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const [activeItemIndex, setActiveItemIndex] = useState(defaultItem)

  const handleItemCallback = (index: number, callback: Function) => {
    setActiveItemIndex(index)
    callback()
  }

  return (
    <Popover.Root
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Popover.Trigger asChild>
        <Button
          className={className}
          {...restProps}
        >
          {children}
        </Button>
      </Popover.Trigger>
      <AnimatePresence>
        {isOpen && (
          <>
            <Popover.Portal forceMount>
              <Popover.Content
                asChild
                align={align}
              >
                <m.ul
                  className={styles.itemsWrapper}
                  variants={itemsVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Popover.Arrow className={styles.itemsWrapperArrow} />
                  {items.map(({ label, callback }, index) => (
                    <li key={`${label}-${index}`}>
                      <button
                        className={clsx(
                          styles.item,
                          index === activeItemIndex && styles.activeItem,
                        )}
                        onClick={() => handleItemCallback(index, callback)}
                      >
                        {label}
                        <AnimatePresence>
                          {index === activeItemIndex && (
                            <CheckIcon className={styles.checkIcon} />
                          )}
                        </AnimatePresence>
                      </button>
                    </li>
                  ))}
                </m.ul>
              </Popover.Content>
            </Popover.Portal>
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
    </Popover.Root>
    // <MenuPrimitive
    //   className={clsx(className, styles.container)}
    //   as="div"
    //   {...restProps}
    // >
    //   {({ open }) => (
    //     <>
    //       <MenuPrimitive.Button
    //         as={Button}
    //         className={clsx(
    //           buttonClassName,
    //           open && activeButtonClassName,
    //           styles.button,
    //         )}
    //         {...buttonProps}
    //       >
    //         {children}
    //       </MenuPrimitive.Button>
    //       <AnimatePresence>
    //         {open && (
    //           <>
    //             <MenuPrimitive.Items
    //               className={clsx(
    //                 styles.itemsWrapper,
    //                 anchorPoint === 'left' && styles.itemsWrapperLeft,
    //                 anchorPoint === 'right' && styles.itemsWrapperRight,
    //               )}
    //               as={m.ul}
    //               variants={itemsVariants}
    //               initial="hidden"
    //               animate="visible"
    //               exit="hidden"
    //             >
    //               {items.map(({ id, label, callback }) => (
    //                 <MenuPrimitive.Item
    //                   as="li"
    //                   key={id}
    //                 >
    //                   {({ active }) => (
    //                     <button
    //                       className={clsx(
    //                         styles.item,
    //                         active && styles.activeItem,
    //                       )}
    //                       onClick={() => handleItemCallback(id, callback)}
    //                     >
    //                       {label}&nbsp;{id === activeItemId && <CheckIcon />}
    //                     </button>
    //                   )}
    //                 </MenuPrimitive.Item>
    //               ))}
    //             </MenuPrimitive.Items>
    //             <m.div
    //               variants={backdropVariants}
    //               animate="visible"
    //               initial="hidden"
    //               exit="hidden"
    //               className={styles.backdrop}
    //             />
    //           </>
    //         )}
    //       </AnimatePresence>
    //     </>
    //   )}
    // </MenuPrimitive>
  )
}
