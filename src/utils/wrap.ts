/**
 * @param {number} min Minimum wrap boundary
 * @param {number} max Maximum wrap boundary
 * @param {number} v Value to be wrapped
 * @returns {number} Wrapped value
 * @description Wraps a value between a minimum and maximum boundary
 */
function wrap(min: number, max: number, value: number) {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

export default wrap
