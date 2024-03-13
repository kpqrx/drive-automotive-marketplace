'use client'

import {
  Container,
  FieldsWrapper,
  Heading,
  SubmitButton,
} from '@/components/organisms/SearchForm/SearchForm.children'
import type {
  SearchFormContextType,
  SearchFormProps,
} from '@/components/organisms/SearchForm/SearchFrom.types'
import type { FormEvent } from 'react'
import { createContext, useCallback } from 'react'

export const SearchFormContext = createContext<SearchFormContextType | null>(
  null,
)
function SearchFormBase(props: SearchFormProps) {
  const { onSubmit, children, ...restProps } = props

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
      }}
    >
      <Container {...restProps}>{children}</Container>
    </SearchFormContext.Provider>
  )
}

export const SearchForm = Object.assign(SearchFormBase, {
  Heading,
  FieldsWrapper,
  SubmitButton,
})
