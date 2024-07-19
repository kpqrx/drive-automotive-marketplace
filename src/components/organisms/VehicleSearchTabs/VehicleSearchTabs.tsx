'use client'

import { Button, Select } from '@/components'
import { Tabs } from '@/components/molecules/Tabs/Tabs'
import { SearchForm } from '@/components/organisms/SearchForm/SearchForm'
import { useOfferParametersSuggestions } from '@/hooks'
import { useState } from 'react'
import styles from './VehicleSearchTabs.module.css'
import { FormProvider, useForm } from 'react-hook-form'
import {
  vehicleSearchFormSchema,
  type VehicleSearchFormSchemaType,
} from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { getSerializedOfferParameter, getLabelValuesByStrings } from '@/utils'
import type { OfferParameterKey } from '@/types'

export const VehicleSearchTabs = () => {
  const [modelsQuery, setModelsQuery] = useState<string>()
  const { bodyTypes, brands, models } = useOfferParametersSuggestions({
    modelsQuery,
  })

  const formMethods = useForm<VehicleSearchFormSchemaType>({
    resolver: zodResolver(vehicleSearchFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const { handleSubmit, register, watch } = formMethods
  const router = useRouter()

  const handleSearchVehicles = (data: VehicleSearchFormSchemaType) => {
    const { manufacturer: brands, model: models, bodyType: bodyTypes } = data

    const serializedParameters = Object.entries({
      brands,
      models,
      bodyTypes,
    })
      .map(([key, value]) =>
        value
          ? getSerializedOfferParameter(key as OfferParameterKey, [value])
          : null,
      )
      .filter(Boolean) as string[]

    router.push(`/offers/${serializedParameters.join('/')}`)
  }

  return (
    <Tabs
      items={[
        {
          label: 'Osobowe',
          content: (
            <FormProvider {...formMethods}>
              <form onSubmit={handleSubmit(handleSearchVehicles)}>
                <fieldset className={styles.formFieldset}>
                  <legend className={styles.formHeading}>
                    Wyszukaj samochód osobowy
                  </legend>
                  <Select
                    label={'Rodzaj nadwozia'}
                    placeholder={'Wybierz rodzaj nadwozia'}
                    items={getLabelValuesByStrings(bodyTypes.data)}
                    {...register('bodyType')}
                  />
                  <Select
                    label={'Marka pojazdu'}
                    placeholder={'Wybierz markę pojazdu'}
                    items={getLabelValuesByStrings(brands.data)}
                    {...register('manufacturer')}
                    onSelect={setModelsQuery}
                  />
                  <Select
                    label={'Model pojazdu'}
                    placeholder={'Wybierz model pojazdu'}
                    items={getLabelValuesByStrings(models.data)}
                    isLoading={models.isLoading}
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
