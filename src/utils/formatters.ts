export type Formatter<T = string> = {
  format: (value: T) => string
  parse: (value: string) => T
}

export const currencyFormatter: (config?: {
  locale?: string
  currency?: string
}) => Formatter<number> = ({ locale = 'pt-BR', currency = 'BRL' } = {}) => {
  const numberFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })

  return {
    format: (value: number) => {
      return numberFormatter.format(value)
    },
    parse: (value: string) => {
      const rawValue = parseInt(value.replace(/\D/g, ''), 10) || 0

      return rawValue / 100
    },
  }
}
