'use client'

import { Button, Select } from '@/components'
import { Tabs } from '@/components/molecules/Tabs/Tabs'
import { SearchForm } from '@/components/organisms/SearchForm/SearchForm'
import { useVehicleSearch } from '@/hooks'
import { useState } from 'react'
import styles from './VehicleSearchTabs.module.css'
import { FormProvider, useForm } from 'react-hook-form'
import {
  vehicleSearchFormSchema,
  type VehicleSearchFormSchemaType,
} from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'

const parseSelectItems = (items?: string[]) =>
  items ? items.map((item) => ({ label: item, value: item })) : []

const bodyTypes = [
  'Sedan',
  'Kombi',
  'Hatchback',
  'Coupe',
  'Cabrio',
  'SUV',
  'Van',
  'Minivan',
]
const manufacturers = ['Audi', 'BMW', 'Mercedes', 'Volkswagen']
const models = ['A3', 'A4', 'A6', 'A8', 'Q3', 'Q5', 'Q7', 'Q8']

export const VehicleSearchTabs = () => {
  const [modelsQuery, setModelsQuery] = useState<string>()
  // const { bodyTypes, manufacturers, models } = useVehicleSearch({ modelsQuery })

  const formMethods = useForm<VehicleSearchFormSchemaType>({
    resolver: zodResolver(vehicleSearchFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const { handleSubmit, register, watch } = formMethods

  return (
    <Tabs
      items={[
        {
          label: 'Osobowe',
          content: (
            <FormProvider {...formMethods}>
              <form
                onSubmit={handleSubmit((data) =>
                  console.log({ data, modelsQuery }),
                )}
              >
                <fieldset className={styles.formFieldset}>
                  <legend className={styles.formHeading}>
                    Wyszukaj samochód osobowy
                  </legend>
                  <Select
                    label={'Rodzaj nadwozia'}
                    placeholder={'Wybierz rodzaj nadwozia'}
                    items={parseSelectItems(bodyTypes)}
                    {...register('bodyType')}
                  />
                  <Select
                    label={'Marka pojazdu'}
                    placeholder={'Wybierz markę pojazdu'}
                    items={parseSelectItems(manufacturers)}
                    {...register('manufacturer')}
                    onSelect={setModelsQuery}
                  />
                  <Select
                    label={'Model pojazdu'}
                    placeholder={'Wybierz model pojazdu'}
                    items={parseSelectItems(models)}
                    {...register('model')}
                    disabled={!watch('manufacturer')}
                  />
                </fieldset>
                <div className={styles.formFooter}>
                  <h2 className={styles.foundOffersHeading}>
                    Znaleziono
                    <span className={styles.foundOffersCount}>5</span>
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
              </form>
            </FormProvider>
          ),
        },
      ]}
    />
  )
}
