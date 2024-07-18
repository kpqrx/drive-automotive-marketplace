import type {
  OfferParameterKey,
  OfferParameterValue,
  OfferParameters,
} from '@/types'
import { kebabToCamelCase, camelToKebabCase } from './casing'

export const getDeserializedOfferParameters = (
  serializedOfferParameters: string[],
): OfferParameters => {
  const offerParameters = Object.fromEntries(
    serializedOfferParameters.map((parameter) => {
      const [kebabCaseKey, dotSeparatedValue] = parameter.split('_')

      const key = kebabToCamelCase(kebabCaseKey) as OfferParameterKey
      const value = dotSeparatedValue.split('.') as OfferParameterValue
      return [key, value]
    }),
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
  const kebabCaseKey = camelToKebabCase(camelCaseKey)
  const dotSeparatedValue = Array.isArray(deserializedValue)
    ? deserializedValue.join('.')
    : deserializedValue.toString()

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
