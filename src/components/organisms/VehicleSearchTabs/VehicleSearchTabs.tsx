'use client'

import { Combobox } from '@/components/molecules/Combobox/Combobox'
import { Tabs } from '@/components/molecules/Tabs/Tabs'
import { SearchForm } from '@/components/organisms/SearchForm/SearchForm'
import React, { type ComponentPropsWithoutRef } from 'react'

const data = [
  {
    label: 'Osobowe',
    heading: 'Wyszukaj samochód osobowy',
    fields: [
      {
        label: 'Typ nadwozia',
        placeholder: 'Wybierz typ nadwozia',
        items: [],
      },
      {
        label: 'Marka pojazdu',
        placeholder: 'Wybierz markę pojazdu',
        items: [],
      },
      {
        label: 'Model pojazdu',
        placeholder: 'Wybierz model pojazdu',
        items: [],
      },
      {
        label: 'Generacja',
        placeholder: 'Wybierz generację',
        items: [],
      },
    ],
  },
  {
    label: 'Motocykle',
    heading: 'Wyszukaj motocykl',
    fields: [
      {
        label: 'Typ pojazdu',
        placeholder: 'Wybierz typ pojazdu',
        items: [],
      },
      {
        label: 'Marka pojazdu',
        placeholder: 'Wybierz markę pojazdu',
        items: [],
      },
      {
        label: 'Model pojazdu',
        placeholder: 'Wybierz model pojazdu',
        items: [],
      },
    ],
  },
  {
    label: 'Użytkowe',
    heading: 'Wyszukaj pojazd użytkowy',
    fields: [
      {
        label: 'Typ pojazdu',
        placeholder: 'Wybierz typ pojazdu',
        items: [],
      },
      {
        label: 'Marka pojazdu',
        placeholder: 'Wybierz markę pojazdu',
        items: [],
      },
      {
        label: 'Model pojazdu',
        placeholder: 'Wybierz model pojazdu',
        items: [],
      },
    ],
  },
]

export const VehicleSearchTabs = (props: ComponentPropsWithoutRef<'div'>) => {
  return (
    <Tabs
      items={data.map(({ label, heading, fields }) => ({
        label,
        content: (
          <SearchForm
            onSubmit={() => console.log('Submitted')}
            advancedFields={() => 'Zaawansowane pola'}
          >
            <SearchForm.Heading>{heading}</SearchForm.Heading>
            <SearchForm.FieldsWrapper>
              {fields.map((fieldProps, i) => (
                <Combobox
                  key={i}
                  {...fieldProps}
                />
              ))}
            </SearchForm.FieldsWrapper>
            <SearchForm.Footer />
            <SearchForm.SubmitButton />
          </SearchForm>
        ),
      }))}
      {...props}
    />
  )
}
