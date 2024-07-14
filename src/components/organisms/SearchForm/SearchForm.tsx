'use client'

import {
  Container,
  FieldsWrapper,
  Heading,
  SubmitButton,
} from '@/components/organisms/SearchForm/SearchForm.children'
import type { SearchFormProps } from '@/components/organisms/SearchForm/SearchFrom.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

function SearchFormBase(props: SearchFormProps) {
  const { children, schema, ...restProps } = props

  const formMethods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  return (
    <FormProvider {...formMethods}>
      <Container {...restProps}>{children}</Container>
    </FormProvider>
  )
}

export const SearchForm = Object.assign(SearchFormBase, {
  Heading,
  FieldsWrapper,
  SubmitButton,
})
