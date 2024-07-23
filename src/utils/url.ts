import type {
  OfferParameterKey,
  OfferParameterValue,
  OfferParameters,
} from '@/types'
import { kebabToCamelCase, camelToKebabCase } from './casing'

export const getDeserializedOfferParameters = (
  serializedOfferParameters: string[],
): OfferParameters => {
  const offerParameters = serializedOfferParameters.reduce(
    (acc, serializedParameter) => {
      const [kebabCaseKey, serializedValue] = serializedParameter.split('_')

      const key = kebabToCamelCase(kebabCaseKey) as OfferParameterKey

      let value = serializedValue.split('.').map((v) => Number(v) || v)
      if (
        Array.isArray(value) &&
        value.length === 1 &&
        typeof value[0] !== 'string'
      )
        value = value[0] as OfferParameterValue

      return {
        ...acc,
        [key]: value,
      }
    },
    {} as OfferParameters,
  )

  return offerParameters
}

export const getOfferParametersFromPathname = (
  pathname: string,
): OfferParameters => {
  const serializedOfferParameters = pathname.split('/').slice(2)

  return getDeserializedOfferParameters(serializedOfferParameters)
}

export const getSerializedOfferParameter = (
  camelCaseKey: OfferParameterKey,
  deserializedValue: OfferParameterValue,
) => {
  if (!deserializedValue) return ''

  const kebabCaseKey = camelToKebabCase(camelCaseKey)
  const dotSeparatedValue = Array.isArray(deserializedValue)
    ? deserializedValue.join('.')
    : deserializedValue

  return `${kebabCaseKey}_${dotSeparatedValue}`
}

export const getUpdatedOfferParametersPathname = (
  pathname: string,
  serializedOfferParameter: string | null,
) => {
  const serializedOfferParameters = pathname.split('/').slice(1)

  if (
    serializedOfferParameter !== null &&
    serializedOfferParameters.length === 0
  ) {
    return serializedOfferParameter
  }

  const updatedSerializedOfferParameters = serializedOfferParameters
    .map((parameter) => {
      const [kebabCaseKey] = parameter.split('_')

      if (serializedOfferParameter === null) return ''

      return kebabCaseKey === serializedOfferParameter.split('_')[0]
        ? serializedOfferParameter
        : parameter
    })
    .filter(Boolean)

  return `/${updatedSerializedOfferParameters.join('/')}`
}
