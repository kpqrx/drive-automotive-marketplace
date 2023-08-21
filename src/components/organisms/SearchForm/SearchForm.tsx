'use client'

import {
  Container,
  FieldsWrapper,
  Footer,
  Heading,
  SubmitButton,
} from '@/components/organisms/SearchForm/SearchForm.children'
import type {
  SearchFormContextType,
  SearchFormProps,
} from '@/components/organisms/SearchForm/SearchFrom.types'
import type { Transition, Variants } from 'framer-motion'
import { m, AnimatePresence } from 'framer-motion'
import type { FormEvent } from 'react'
import { createContext, useCallback, useState } from 'react'
import styles from './SearchForm.module.css'

const MotionFieldsWrapper = m(FieldsWrapper)

export const SearchFormContext = createContext<SearchFormContextType | null>(
  null,
)

const advancedFieldsTransition: Transition = {
  type: 'tween',
  duration: 0.175,
}
const advancedFieldsVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
  },
  visible: {
    opacity: 1,
    height: 'auto',
    marginBottom: '28px',
  },
}

function SearchFormBase(props: SearchFormProps) {
  const { onSubmit, advancedFields, children, ...restProps } = props

  const [isAdvancedModeActive, setAdvancedModeActive] = useState(false)
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      onSubmit()
    },
    [onSubmit],
  )

  return (
    <SearchFormContext.Provider
      value={{
        handleSubmit,
        setAdvancedModeActive,
      }}
    >
      <Container {...restProps}>
        {children}
        <AnimatePresence>
          {isAdvancedModeActive && (
            <MotionFieldsWrapper
              className={styles.advancedFieldsWrapper}
              transition={advancedFieldsTransition}
              variants={advancedFieldsVariants}
              initial="hidden"
              exit="hidden"
              animate="visible"
            >
              {advancedFields()}
            </MotionFieldsWrapper>
          )}
        </AnimatePresence>
      </Container>
    </SearchFormContext.Provider>
  )
}

export const SearchForm = Object.assign(SearchFormBase, {
  Heading,
  FieldsWrapper,
  Footer,
  SubmitButton,
})
