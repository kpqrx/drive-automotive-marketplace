'use client'

import { Tabs } from '@/components/molecules/Tabs/Tabs'
import { Combobox } from '@/components/molecules/Combobox/Combobox'
import { FaCar, FaTruck, FaMotorcycle } from 'react-icons/fa'
import { SearchForm } from '@/components/organisms/SearchForm/SearchForm'
export default function Home() {
  return (
    <>
      <Tabs
        items={[
          {
            label: (
              <>
                <FaCar />
                Osobowe
              </>
            ),
            content: (
              <SearchForm
                onSubmit={() => console.log('Submitted')}
                advancedFields={() => 'elo'}
              >
                <SearchForm.Heading>
                  Wyszukaj samochód osobowy
                </SearchForm.Heading>
                <SearchForm.FieldsWrapper>
                  <Combobox
                    label="Typ nadwozia"
                    placeholder="Wybierz typ nadwozia"
                    items={[]}
                  />
                  <Combobox
                    label="Marka pojazdu"
                    placeholder="Wybierz markę pojazdu"
                    items={[]}
                  />
                  <Combobox
                    label="Model pojazdu"
                    placeholder="Wybierz model pojazdu"
                    items={[]}
                  />
                  <Combobox
                    label="Generacja"
                    placeholder="Wybierz generację"
                    items={[]}
                  />
                </SearchForm.FieldsWrapper>
                <SearchForm.Footer />
                <SearchForm.SubmitButton>Wyszukaj</SearchForm.SubmitButton>
              </SearchForm>
            ),
          },
          {
            label: (
              <>
                <FaTruck />
                Użytkowe
              </>
            ),
            content: (
              <SearchForm
                onSubmit={() => console.log('Submitted')}
                advancedFields={() => 'elo'}
              >
                <SearchForm.Heading>
                  Wyszukaj samochód użytkowy
                </SearchForm.Heading>
                <SearchForm.FieldsWrapper>
                  <Combobox
                    label="Typ pojazdu"
                    placeholder="Wybierz typ pojazdu"
                    items={[]}
                  />
                  <Combobox
                    label="Marka pojazdu"
                    placeholder="Wybierz markę pojazdu"
                    items={[]}
                  />
                  <Combobox
                    label="Model pojazdu"
                    placeholder="Wybierz model pojazdu"
                    items={[]}
                  />
                </SearchForm.FieldsWrapper>
                <SearchForm.Footer />
                <SearchForm.SubmitButton>Wyszukaj</SearchForm.SubmitButton>
              </SearchForm>
            ),
          },
          {
            label: (
              <>
                <FaMotorcycle />
                Motocykle
              </>
            ),
            content: (
              <SearchForm
                onSubmit={() => console.log('Submitted')}
                advancedFields={() => 'elo'}
              >
                <SearchForm.Heading>Wyszukaj motocykl</SearchForm.Heading>
                <SearchForm.FieldsWrapper>
                  <Combobox
                    label="Typ pojazdu"
                    placeholder="Wybierz typ pojazdu"
                    items={[]}
                  />
                  <Combobox
                    label="Marka pojazdu"
                    placeholder="Wybierz markę pojazdu"
                    items={[]}
                  />
                  <Combobox
                    label="Model pojazdu"
                    placeholder="Wybierz model pojazdu"
                    items={[]}
                  />
                </SearchForm.FieldsWrapper>
                <SearchForm.Footer />
                <SearchForm.SubmitButton>Wyszukaj</SearchForm.SubmitButton>
              </SearchForm>
            ),
          },
        ]}
      />
    </>
  )
}
