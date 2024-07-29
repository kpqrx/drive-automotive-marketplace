'use client'
import { Modal } from '@/components/molecules/Modal/Modal'
import type { FiltersMenuProps } from '@/components/organisms/FiltersMenu/FiltersMenu.types'
import { XMarkIcon as CloseIcon } from '@heroicons/react/24/outline'
import { useOfferParameters, useOfferParametersSuggestions } from '@/hooks'
import type { OfferParameters } from '@/types'
import { Controller, useForm } from 'react-hook-form'
import { Select } from '@/components/molecules/Select/Select'
import { Button, CheckboxGroup } from '@/components'
import { getLabelTitleByKey } from '@/utils'
import styles from './FiltersMenu.module.css'
import { useState, type ComponentProps } from 'react'
import { Multiselect } from '@/components'

type FormMultiselectProps = ComponentProps<typeof Multiselect> & {
  control: any
  name: string
}
const FormMultiselect = (props: FormMultiselectProps) => (
  <Controller
    control={props.control}
    name={props.name}
    render={({ field }) => (
      <Multiselect
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

export const FiltersMenu = (props: FiltersMenuProps) => {
  const { isOpen, setIsOpen, ...restProps } = props
  const { setAllParameters, parameters } = useOfferParameters()

  const [modelsQuery, setModelsQuery] = useState<string>()

  const handleSetModelsQuery = (values: (string | number)[]) => {
    if (values.length > 1) {
      setModelsQuery(undefined)
      return
    }
    setModelsQuery(values[0] as string)
  }

  const {
    brands,
    models,
    bodyTypes,
    fuelTypes,
    prodYears,
    priceRange,
    mileage,
    power,
    ...equipment
  } = useOfferParametersSuggestions({
    modelsQuery,
  })

  const { control, handleSubmit } = useForm<OfferParameters>({
    mode: 'onSubmit',
    values: parameters,
  })

  const handleFormSubmit = handleSubmit((data) => {
    setAllParameters(data)
    setIsOpen(false)
  })

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      label="Filtrowanie wyników"
      contextButtonLabel={<CloseIcon />}
      contextButtonCallback={() => setIsOpen(false)}
      {...restProps}
    >
      <form
        className={styles.form}
        onSubmit={handleFormSubmit}
      >
        <div className={styles.filtersGroup}>
          <span className={styles.filtersGroupLabel}>
            Podstawowe informacje
          </span>

          <FormMultiselect
            label="Marka pojazdu"
            placeholder="Wybierz interesujące Cię marki"
            items={brands.data}
            control={control}
            name="brands"
            onValueChange={handleSetModelsQuery}
          />
          <FormMultiselect
            label="Model pojazdu"
            placeholder="Wybierz interesujące Cię modele"
            items={models.data}
            control={control}
            name="models"
            disabled={!modelsQuery}
          />
          <FormMultiselect
            label="Rodzaj nadwozia"
            placeholder="Wybierz rodzaje nadwozia"
            items={bodyTypes.data}
            name="bodyTypes"
            control={control}
          />
          <FormMultiselect
            label="Rodzaj paliwa"
            placeholder="Wybierz rodzaje paliwa"
            items={fuelTypes.data}
            control={control}
            name="fuelTypes"
          />
        </div>

        <div className={styles.filtersGroup}>
          <span className={styles.filtersGroupLabel}>Cena</span>

          <FormSelect
            control={control}
            label="Cena od"
            placeholder="Podaj cenę minimalną"
            items={priceRange.data}
            name="minPrice"
          />
          <FormSelect
            control={control}
            label="Cena do"
            placeholder="Podaj cenę maksymalną"
            items={priceRange.data}
            name="maxPrice"
          />
        </div>

        <div className={styles.filtersGroup}>
          <span className={styles.filtersGroupLabel}>Przebieg</span>

          <FormSelect
            control={control}
            label="Przebieg od"
            placeholder="Podaj przebieg minimalny"
            items={mileage.data}
            name="minMileage"
          />
          <FormSelect
            control={control}
            label="Przebieg do"
            placeholder="Podaj przebieg maksymalny"
            items={mileage.data}
            name="maxMileage"
          />
        </div>

        <div className={styles.filtersGroup}>
          <span className={styles.filtersGroupLabel}>Rok produkcji</span>

          <FormSelect
            control={control}
            label="Rok produkcji od"
            placeholder="Podaj minimalny rok produkcji"
            items={prodYears.data}
            name="minYear"
          />
          <FormSelect
            control={control}
            label="Rok produkcji do"
            placeholder="Podaj maksymalny rok produkcji"
            items={prodYears.data}
            name="maxYear"
          />
        </div>

        <div className={styles.filtersGroup}>
          <span className={styles.filtersGroupLabel}>Moc silnika</span>

          <FormSelect
            control={control}
            label="Moc silnika od"
            placeholder="Podaj minimalną moc silnika"
            items={power.data}
            name="minPower"
          />
          <FormSelect
            control={control}
            label="Moc silnika do"
            placeholder="Podaj maksymalną moc silnika"
            items={power.data}
            name="maxPower"
          />
        </div>

        <div className={styles.filtersGroup}>
          <span className={styles.filtersGroupLabel}>Wyposażenie</span>

          {Object.entries(equipment).map(([name, { data }]) => {
            const { label } = getLabelTitleByKey(name)

            return (
              <CheckboxGroup
                key={name}
                control={control}
                name={name}
                items={data}
              >
                <span className={styles.nestedFiltersGroupLabel}>{label}</span>
              </CheckboxGroup>
            )
          })}
        </div>

        <div className={styles.submitButtonWrapper}>
          <Button
            className={styles.submitButton}
            type="submit"
          >
            Zastosuj filtry
          </Button>
        </div>
      </form>
    </Modal>
  )
}
