'use client'

import {
  Container,
  Heading,
  Footer,
  SubmitButton,
} from '@/components/organisms/SearchForm/SearchForm.children'
import type {
  SearchFormProps,
  SearchFormContextType,
} from '@/components/organisms/SearchForm/SearchFrom.types'
import type { FormEvent } from 'react'
import { createContext, useCallback, useState } from 'react'

export const SearchFormContext = createContext<SearchFormContextType | null>(
  null,
)

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
        {isAdvancedModeActive && advancedFields()}
      </Container>
    </SearchFormContext.Provider>
  )
}

export const SearchForm = Object.assign(SearchFormBase, {
  Heading,
  Footer,
  SubmitButton,
})
