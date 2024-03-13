'use client'

import { Button } from '@/components'
import { Combobox } from '@/components/molecules/Combobox/Combobox'
import { Tabs } from '@/components/molecules/Tabs/Tabs'
import { SearchForm } from '@/components/organisms/SearchForm/SearchForm'
import { type ComponentPropsWithoutRef } from 'react'
import styles from './VehicleSearchTabs.module.css'

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
    disabled: true,
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
    disabled: true,
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
      items={data.map(({ label, heading, fields, disabled }) => ({
        label,
        disabled,
        content: (
          <SearchForm onSubmit={() => console.log('Submitted')}>
            <SearchForm.Heading>{heading}</SearchForm.Heading>
            <SearchForm.FieldsWrapper>
              {fields.map((fieldProps, i) => (
                <Combobox
                  key={i}
                  {...fieldProps}
                />
              ))}
            </SearchForm.FieldsWrapper>
            <div className={styles.formFooter}>
              <h2 className={styles.foundOffersHeading}>
                Znaleziono
                <span className={styles.foundOffersCount}>32 900</span>
                ogłoszeń.
              </h2>
              <Button
                className={styles.advancedSearchButton}
                variant="secondary"
                size="small"
              >
                Zaawansowane wyszukiwanie
              </Button>
              <SearchForm.SubmitButton className={styles.submitButton} />
            </div>
          </SearchForm>
        ),
      }))}
      {...props}
    />
  )
}
