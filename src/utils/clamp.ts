/**
 * @param {number} min Minimum clamp boundary
 * @param {number} max Maximum clamp boundary
 * @param {number} value Value to be clamped
 * @returns {number} Clamped value
 * @description Clamps a value to a minimum and maximum boundary
 */
function clamp(min: number, max: number, value: number) {
  if (value > max) return max
  if (value < min) return min
  return value
}

export default clamp
