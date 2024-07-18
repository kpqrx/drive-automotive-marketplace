import { useState } from 'react'
import type {
  OfferParameterKey,
  OfferParameterValue,
  OfferParameters,
} from '@/types'
import {
  getOfferParametersFromPathname,
  getSerializedOfferParameter,
  getUpdatedOfferParametersPathname,
} from '@/utils'
import { usePathname, useRouter } from 'next/navigation'

type UseOfferFilteringReturnType = {
  removeFilter: (key: OfferParameterKey) => void
  removeAllFilters: () => void
  setFilter: (key: OfferParameterKey, value: OfferParameterValue) => void
  setAllFilters: (filters: OfferParameters) => void
  filters: OfferParameters
}

function useOfferFiltering(): UseOfferFilteringReturnType {
  const pathname = usePathname()
  const router = useRouter()

  const [offerFilters, setOfferFilters] = useState<OfferParameters>(
    getOfferParametersFromPathname(pathname),
  )

  const setFilter = (key: OfferParameterKey, value: OfferParameterValue) => {
    const serializedOfferParameter = getSerializedOfferParameter(key, value)
    const newPathname = getUpdatedOfferParametersPathname(
      pathname,
      serializedOfferParameter,
    )

    router.replace(newPathname, { scroll: false })

    const newOfferParameters = getOfferParametersFromPathname(newPathname)
    setOfferFilters(newOfferParameters)
  }

  const removeFilter = (key: OfferParameterKey) => {
    const newPathname = getUpdatedOfferParametersPathname(pathname, null)

    router.replace(newPathname, { scroll: false })

    const newOfferParameters = getOfferParametersFromPathname(newPathname)
    setOfferFilters(newOfferParameters)
  }

  const removeAllFilters = () => {
    router.replace('/offers', { scroll: false })

    setOfferFilters({})
  }

  return {
    removeFilter,
    removeAllFilters,
    setFilter,
    setAllFilters: setOfferFilters,
    filters: offerFilters,
  }
}

export default useOfferFiltering
