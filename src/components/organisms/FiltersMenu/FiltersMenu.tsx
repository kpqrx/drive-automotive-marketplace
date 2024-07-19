'use client'
import { Modal } from '@/components/molecules/Modal/Modal'
import type {
  FiltersMenuItemProps,
  FiltersMenuProps,
} from '@/components/organisms/FiltersMenu/FiltersMenu.types'
import clsx from 'clsx'
import type { Transition, Variants } from 'framer-motion'
import { m, AnimatePresence } from 'framer-motion'
import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon as CloseIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import styles from './FiltersMenu.module.css'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import {
  offerFilteringFormSchema,
  type OfferFilteringFormSchema,
  type OfferFilteringFormSchemaKey,
} from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'

const menuTransition: Transition = {
  type: 'spring',
  damping: 30,
  stiffness: 250,
  mass: 1.25,
}

const menuVariants: Variants = {
  inLeft: {
    x: '-100%',
  },
  inRight: {
    x: '100%',
  },
  out: {
    x: 0,
  },
}

export const FiltersMenuItem = forwardRef<HTMLDivElement, FiltersMenuItemProps>(
  (props, ref) => {
    const { children, name, label, ...restProps } = props

    const formContext = useFormContext<OfferFilteringFormSchema>()

    return (
      <m.div
        ref={ref}
        className={styles.contentWrapper}
        key={`filters-menu-${name}`}
        variants={menuVariants}
        transition={menuTransition}
        animate="out"
        initial={'inRight'}
        exit={'inRight'}
        {...restProps}
      >
        {children(formContext)}
      </m.div>
    )
  },
)
FiltersMenuItem.displayName = 'FiltersMenuItem'

const FiltersMenuContainer = (props: FiltersMenuProps) => {
  const { isOpen, setIsOpen, children, ...restProps } = props

  const formMethods = useForm({
    resolver: zodResolver(offerFilteringFormSchema),
  })

  const {
    handleSubmit,
    watch: watchForm,
    reset: resetForm,
    resetField,
    getValues,
  } = formMethods

  useEffect(() => {
    const formWatcher = watchForm((data) => console.log(data))
    return formWatcher.unsubscribe
  }, [])

  const hasValidChildren = Children.toArray(children).every(
    (childElement) =>
      isValidElement(childElement) && childElement.type === FiltersMenuItem,
  )

  if (!hasValidChildren) {
    throw new Error(
      '`FiltersMenu` component accepts only `FiltersMenuItem` components as children.',
    )
  }

  const [selectedMenuItemName, setSelectedMenuItemName] = useState<
    OfferFilteringFormSchemaKey | ''
  >('')

  const handleMenuSelection = (name: OfferFilteringFormSchemaKey) => {
    setSelectedMenuItemName(name)
  }

  const handleMenuReset = () => {
    setSelectedMenuItemName('')
  }

  const handleSetIsOpen = (isOpen: boolean) => {
    handleMenuReset()
    setIsOpen(isOpen)
  }

  const handleClearButtonClick = useCallback(() => {
    if (selectedMenuItemName) {
      resetField(selectedMenuItemName)
      return
    }
    resetForm()
  }, [resetField, resetForm, selectedMenuItemName])

  const selectedMenuItem = useMemo(
    () =>
      Children.toArray(children).find((childElement) => {
        if (!isValidElement(childElement)) return null

        const { name } = childElement.props
        return name === selectedMenuItemName
      }),
    [children, selectedMenuItemName],
  )

  const menuItemMetadata = useMemo(
    () =>
      Children.toArray(children)
        .map((childElement) => {
          if (!isValidElement(childElement)) return null

          const { name, label } = childElement.props
          return { name, label }
        })
        .filter(Boolean) as Pick<FiltersMenuItemProps, 'name' | 'label'>[],
    [children],
  )

  const currentMenuLabel = useMemo(
    () =>
      menuItemMetadata.find(({ name }) => name === selectedMenuItemName)
        ?.label ?? 'Filtrowanie wyników',
    [menuItemMetadata, selectedMenuItemName],
  )

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={handleSetIsOpen}
      label={currentMenuLabel}
      contextButtonLabel={
        selectedMenuItem ? <ChevronLeftIcon /> : <CloseIcon />
      }
      contextButtonCallback={() =>
        selectedMenuItem ? handleMenuReset() : setIsOpen(false)
      }
      headerSlot={
        <button
          onClick={handleClearButtonClick}
          className={styles.clearButton}
        >
          <TrashIcon /> Wyczyść
        </button>
      }
      {...restProps}
    >
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit((data) => console.log('submit', { data }))}
        >
          <AnimatePresence
            mode="popLayout"
            initial={false}
          >
            {selectedMenuItem ? (
              selectedMenuItem
            ) : (
              <m.ul
                className={clsx(styles.contentWrapper, styles.itemsList)}
                key="menus-list"
                variants={menuVariants}
                transition={menuTransition}
                animate="out"
                initial={selectedMenuItem ? 'inRight' : 'inLeft'}
                exit={selectedMenuItem ? 'inRight' : 'inLeft'}
              >
                {menuItemMetadata.map(({ name, label }) => (
                  <li key={name}>
                    <button
                      className={styles.item}
                      onClick={() => handleMenuSelection(name)}
                    >
                      <span className={styles.itemTitle}>
                        {label}&nbsp;
                        {getValues(name) && (
                          <span className={styles.changesIndicator} />
                        )}
                      </span>
                      <ChevronRightIcon />
                    </button>
                  </li>
                ))}
              </m.ul>
            )}
          </AnimatePresence>
        </form>
      </FormProvider>
    </Modal>
  )
}

export const FiltersMenu = Object.assign(FiltersMenuContainer, {
  Item: FiltersMenuItem,
})
