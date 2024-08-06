'use client'
import { useEffect } from 'react'
import type {
  OfferParameterKey,
  OfferParameterValue,
  OfferParameters,
} from '@/types'
import {
  getOfferParametersFromPathname,
  getSerializedOfferParameter,
  getUpdatedOfferParametersPathname,
  isEmptyOfferParameterValue,
  replaceHistoryState,
} from '@/utils'
import { usePathname } from 'next/navigation'
import { useOfferParametersStore } from '@/store'

type UseOfferParametersReturnType = {
  setParameter: (key: OfferParameterKey, value: OfferParameterValue) => void
  setAllParameters: (parameters: OfferParameters) => void
  parameters: OfferParameters
  removeAllParameters: () => void
  removeParameter: (key: OfferParameterKey) => void
}

function useOfferParameters(): UseOfferParametersReturnType {
  const pathname = usePathname()

  const {
    setParameter,
    setAllParameters,
    removeAllParameters,
    removeParameter,
    parameters,
  } = useOfferParametersStore()

  useEffect(() => {
    if (!pathname.includes('/offers')) return

    const offerParameters = getOfferParametersFromPathname(pathname)
    setAllParameters(offerParameters)
  }, [pathname, setAllParameters])

  const handleSetParameter = (
    key: OfferParameterKey,
    value: OfferParameterValue,
  ) => {
    const serializedOfferParameter = getSerializedOfferParameter(key, value)
    const newPathname = getUpdatedOfferParametersPathname(
      pathname,
      serializedOfferParameter,
    )

    setParameter(key, value)
    replaceHistoryState(newPathname)
  }

  const handleSetAllParameters = (parameters: OfferParameters) => {
    const serializedParameters = Object.entries(parameters)
      .filter(([, value]) => !isEmptyOfferParameterValue(value))
      .map(([key, value]) =>
        getSerializedOfferParameter(key as OfferParameterKey, value),
      )

    const newPathname = `/offers/${serializedParameters.join('/')}`

    setAllParameters(parameters)

    replaceHistoryState(newPathname)
  }

  const handleRemoveAllParameters = () => {
    removeAllParameters()

    replaceHistoryState('/offers')
  }

  const handleRemoveParameter = (key: OfferParameterKey) => {
    const newPathname = getUpdatedOfferParametersPathname(pathname, null)

    removeParameter(key)

    replaceHistoryState(newPathname)
  }

  return {
    setParameter: handleSetParameter,
    setAllParameters: handleSetAllParameters,
    removeAllParameters: handleRemoveAllParameters,
    removeParameter: handleRemoveParameter,
    parameters,
  }
}

export default useOfferParameters
