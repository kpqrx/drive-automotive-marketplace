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
import { useEffect, useState, type ComponentProps } from 'react'

const StringSelect = (props: ComponentProps<typeof Select>) => (
  <Controller
    control={props.control}
    name={props.name}
    render={({ field }) => (
      <Select
        {...props}
        onValueChange={(value) =>
          field.onChange({
            target: {
              value: value
                ? [...(field.value || []), value]
                : (field.value || []).filter((v) => v !== value),
            },
          })
        }
        defaultValue={field.value}
      />
    )}
  />
)

export const FiltersMenu = (props: FiltersMenuProps) => {
  const { isOpen, setIsOpen, ...restProps } = props
  const { setAllParameters } = useOfferParameters()

  const [modelsQuery, setModelsQuery] = useState('')
  const {
    brands,
    models,
    bodyTypes,
    fuelTypes,
    prodYears,
    priceRange,
    mileage,
    ...equipment
  } = useOfferParametersSuggestions({
    modelsQuery,
  })

  const { register, control, watch, handleSubmit } = useForm<OfferParameters>({
    mode: 'onSubmit',
  })

  const [hasMadeChanges, setHasMadeChanges] = useState(false)

  useEffect(() => {
    const watcher = watch((data) => {
      console.log(data)
      setHasMadeChanges(true)
    })

    return () => watcher.unsubscribe()
  }, [watch])

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
      <form onSubmit={handleFormSubmit}>
        <div className={styles.filtersGroup}>
          <span className={styles.filtersGroupLabel}>
            Podstawowe informacje
          </span>

          <StringSelect
            label="Marka pojazdu"
            items={brands.data}
            control={control}
            name="brands"
            onSelect={setModelsQuery}
          />
          <Select
            label="Model pojazdu"
            items={models.data}
            {...register('models')}
            disabled={!modelsQuery}
          />
          <Select
            label="Rodzaj nadwozia"
            items={bodyTypes.data}
            {...register('bodyTypes')}
          />
          <Select
            label="Typ paliwa"
            items={fuelTypes.data}
            // @ts-ignore TODO: Fix this
            {...register('fuelTypes', { valueAsNumber: true })}
          />
        </div>

        <div className={styles.filtersGroup}>
          <span className={styles.filtersGroupLabel}>Cena</span>

          <Select
            label="Cena od"
            placeholder="Podaj cenę minimalną"
            items={priceRange.data}
            {...register('minPrice', { valueAsNumber: true })}
          />
          <Select
            label="Cena do"
            placeholder="Podaj cenę maksymalną"
            items={priceRange.data}
            {...register('maxPrice', { valueAsNumber: true })}
          />
        </div>

        <div className={styles.filtersGroup}>
          <span className={styles.filtersGroupLabel}>Przebieg</span>

          <Select
            label="Przebieg od"
            placeholder="Podaj przebieg minimalny"
            items={mileage.data}
            {...register('minMileage', { valueAsNumber: true })}
          />
          <Select
            label="Przebieg do"
            placeholder="Podaj przebieg maksymalny"
            items={mileage.data}
            {...register('maxMileage', { valueAsNumber: true })}
          />
        </div>

        <div className={styles.filtersGroup}>
          <span className={styles.filtersGroupLabel}>Rok produkcji</span>

          <Select
            label="Rok produkcji od"
            placeholder="Podaj minimalny rok produkcji"
            items={prodYears.data}
            {...register('minYear', { valueAsNumber: true })}
          />
          <Select
            label="Rok produkcji do"
            placeholder="Podaj maksymalny rok produkcji"
            items={prodYears.data}
            {...register('maxYear', { valueAsNumber: true })}
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

        {hasMadeChanges && (
          <div className={styles.submitButtonWrapper}>
            <Button
              className={styles.submitButton}
              type="submit"
            >
              Zastosuj filtry
            </Button>
          </div>
        )}
      </form>
    </Modal>
  )
}
