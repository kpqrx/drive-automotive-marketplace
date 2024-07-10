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
