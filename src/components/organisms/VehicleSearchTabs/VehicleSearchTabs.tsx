'use client'

import { Button, Select } from '@/components'
import { Tabs } from '@/components/molecules/Tabs/Tabs'
import { SearchForm } from '@/components/organisms/SearchForm/SearchForm'
import { useOfferParametersSuggestions } from '@/hooks'
import { useState, type ComponentProps } from 'react'
import styles from './VehicleSearchTabs.module.css'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import {
  vehicleSearchFormSchema,
  type VehicleSearchFormSchemaType,
} from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { getSerializedOfferParameter } from '@/utils'
import type { OfferParameterKey } from '@/types'
import type { SelectItemType } from '@/components/molecules/Select/Select.types'

type FormSelectProps = ComponentProps<typeof Select> & {
  control: any
  name: string
}
const FormSelect = (props: FormSelectProps) => (
  <Controller
    control={props.control}
    name={props.name}
    render={({ field }) => (
      <Select
        {...props}
        onValueChange={(value) => {
          field.onChange({
            target: {
              value,
            },
          })
          if (props.onValueChange) props.onValueChange(value)
        }}
        defaultValue={field.value}
      />
    )}
  />
)

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
  const { handleSubmit, control, watch } = formMethods
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
                  <FormSelect
                    control={control}
                    label={'Rodzaj nadwozia'}
                    placeholder={'Wybierz rodzaj nadwozia'}
                    items={bodyTypes.data as SelectItemType[]}
                    name="bodyType"
                  />
                  <FormSelect
                    control={control}
                    label={'Marka pojazdu'}
                    placeholder={'Wybierz markę pojazdu'}
                    items={brands.data as SelectItemType[]}
                    name="manufacturer"
                    onValueChange={setModelsQuery}
                  />
                  <FormSelect
                    control={control}
                    label={'Model pojazdu'}
                    placeholder={'Wybierz model pojazdu'}
                    items={models.data as SelectItemType[]}
                    isLoading={models.isLoading}
                    name="model"
                    disabled={!watch('manufacturer')}
                  />
                </fieldset>
                <div className={styles.formFooter}>
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
