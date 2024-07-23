type GetNumbersRangeOptions = {
  start?: number
  end: number
  step?: number
}

/**
 * Generates an array of numbers within a specified range.
 *
 * @param options - The options for generating the range of numbers.
 * @returns An array of numbers within the specified range.
 */
export function getNumbersRange(options: GetNumbersRangeOptions) {
  const { start = 0, end, step = 1 } = options

  return Array.from(
    { length: (end - start) / step + 1 },
    (_, i) => start + i * step,
  )
}
