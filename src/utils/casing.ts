/**
 * Converts a string to PascalCase.
 *
 * @param str - The string to convert.
 * @returns The converted string in PascalCase.
 */
export function toPascalCase(str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

/**
 * Converts a string to capital case.
 * @param str - The input string to be converted.
 * @returns The input string converted to capital case.
 */
export function toCapitalCase(str: string) {
  return str
    .trim()
    .split(' ')
    .map((word) => {
      const [first, ...rest] = word.split('')
      return [first.toUpperCase(), ...rest].join('')
    })
    .join(' ')
}

/**
 * Converts a string from camel case to kebab case.
 *
 * @param str - The string to convert.
 * @returns The converted string in kebab case.
 */
export function kebabToCamelCase(str: string) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}

/**
 * Converts a string from kebab case to camel case.
 *
 * @param str - The string to convert.
 * @returns The converted string in camel case.
 */
export function camelToKebabCase(str: string) {
  return str
    .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
    .toLowerCase()
}

export function kebabToNormalCase(str: string) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
