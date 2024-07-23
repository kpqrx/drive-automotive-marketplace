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
}

function useOfferParameters(): UseOfferParametersReturnType {
  const pathname = usePathname()

  const { setParameter, setAllParameters, parameters } =
    useOfferParametersStore()

  useEffect(() => {
    const offerParameters = getOfferParametersFromPathname(pathname)
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
    replaceHistoryState(newPathname)
  }

  const handleSetAllParameters = (parameters: OfferParameters) => {
    const serializedParameters = Object.entries(parameters)
      .filter(([, value]) => !isEmptyOfferParameterValue(value))
      .map(([key, value]) =>
        getSerializedOfferParameter(key as OfferParameterKey, value),
      )

    console.log({ parameters, serializedParameters })

    const newPathname = `/offers/${serializedParameters.join('/')}`

    setAllParameters(parameters)

    replaceHistoryState(newPathname)
  }

  return {
    setParameter: handleSetParameter,
    setAllParameters: handleSetAllParameters,
    parameters,
  }
}

export default useOfferParameters
