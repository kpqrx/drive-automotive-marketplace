'use client'

import {
  Container,
  Heading,
  Footer,
  SubmitButton,
} from '@/components/organisms/SearchForm/SearchForm.children'
import styles from './SearchForm.module.css'
import type {
  SearchFormProps,
  SearchFormContextType,
} from '@/components/organisms/SearchForm/SearchFrom.types'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { FormEvent } from 'react'
import { createContext, useCallback, useState } from 'react'

const MotionContainer = motion(Container)

export const SearchFormContext = createContext<SearchFormContextType | null>(
  null,
)

const advancedFieldsVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: 'auto',
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
            <motion.div
              className={styles.container}
              variants={advancedFieldsVariants}
              initial="hidden"
              exit="hidden"
              animate="visible"
              layout
            >
              {advancedFields()}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </SearchFormContext.Provider>
  )
}

export const SearchForm = Object.assign(SearchFormBase, {
  Heading,
  Footer,
  SubmitButton,
})
