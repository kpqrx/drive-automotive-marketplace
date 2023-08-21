import { useEffect } from 'react'

/**
 * A custom React hook for creating an interval that triggers a callback function.
 *
 * This hook uses the `requestAnimationFrame` method to create a loop that repeatedly
 * checks the elapsed time and triggers the provided callback function when the specified
 * interval has passed.
 *
 * @param {Function} callback - The callback function to be executed at the specified intervals.
 * @param {number} interval - The interval in milliseconds between each callback execution.
 *
 * @example
 * // Using the useInterval hook
 * function MyComponent() {
 *   useInterval(() => {
 *     console.log('Interval callback executed.');
 *   }, 1000); // Callback will be executed every 1000ms (1 second)
 *   // ...
 * }
 *
 * @returns {void}
 */
const useInterval = (callback: VoidFunction, interval: number) => {
  useEffect(() => {
    let lastTimestamp = 0

    function loop(timestamp: number) {
      if (timestamp - lastTimestamp >= interval) {
        callback()
        lastTimestamp = timestamp
      }

      requestAnimationFrame(loop)
    }

    const requestId = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(requestId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useInterval
