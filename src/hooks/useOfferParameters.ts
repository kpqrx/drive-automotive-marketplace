import { useEffect, useState } from 'react'
import type {
  OfferParameterKey,
  OfferParameterValue,
  OfferParameters,
} from '@/types'
import {
  getOfferParametersFromPathname,
  getSerializedOfferParameter,
  getUpdatedOfferParametersPathname,
  replaceHistoryState,
} from '@/utils'
import { usePathname } from 'next/navigation'
import { useOfferParametersStore } from '@/store'

type UseOfferParametersReturnType = {
  removeParameter: (key: OfferParameterKey) => void
  removeAllParameters: () => void
  setParameter: (key: OfferParameterKey, value: OfferParameterValue) => void
  setAllParameters: (parameters: OfferParameters) => void
  parameters: OfferParameters
}

function useOfferParameters(): UseOfferParametersReturnType {
  const pathname = usePathname()

  const {
    setParameter,
    setAllParameters,
    removeParameter,
    removeAllParameters,
    ...offerParametersStore
  } = useOfferParametersStore()

  useEffect(() => {
    const offerParameters = getOfferParametersFromPathname(pathname)
    console.log('aaa')
    setAllParameters(offerParameters)
  }, [])

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
    console.log(newPathname)
    replaceHistoryState(newPathname)
  }

  const handleRemoveParameter = (key: OfferParameterKey) => {
    // TODO: Implement removing filter
  }

  const handleRemoveAllParameters = () => {
    // TODO: Implement removing all parameters
  }

  const handleSetAllParameters = (parameters: OfferParameters) => {
    const serializedParameters = Object.entries(parameters)
      .map(([key, value]) =>
        value
          ? getSerializedOfferParameter(key as OfferParameterKey, value)
          : null,
      )
      .filter(Boolean) as string[]

    const newPathname = `/offers/${serializedParameters.join('/')}`

    setAllParameters(parameters)

    replaceHistoryState(newPathname)
  }

  return {
    removeParameter: handleRemoveParameter,
    removeAllParameters: handleRemoveAllParameters,
    setParameter: handleSetParameter,
    setAllParameters: handleSetAllParameters,
    parameters: offerParametersStore,
  }
}

export default useOfferParameters
