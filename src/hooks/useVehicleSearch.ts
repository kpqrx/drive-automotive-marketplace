import { getBodyTypes, getManufacturers, getModels } from '@/lib'
import useSWR from 'swr'

function useVehicleSearch({ modelsQuery = '' }: { modelsQuery?: string }) {
  const bodyTypes = useSWR('bodyTypes', getBodyTypes)
  const manufacturers = useSWR('manufacturers', getManufacturers)
  const models = useSWR(modelsQuery ? 'models' : null, () =>
    getModels(modelsQuery),
  )

  return {
    bodyTypes,
    manufacturers,
    models,
  }
}

export default useVehicleSearch
