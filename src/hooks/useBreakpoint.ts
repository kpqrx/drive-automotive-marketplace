import { useEffect, useRef, useState } from 'react'

/**
 * Custom React hook that returns the current status of a media query matching a given breakpoint.
 * The hook updates the status whenever the viewport width crosses the specified breakpoint.
 *
 * @param {number} breakpoint - The width breakpoint value in pixels.
 * @returns {boolean} isActive - Indicates whether the current viewport width is above the provided breakpoint.
 *
 * @example
 * // Usage in a functional component
 * function MyComponent() {
 *   const isAboveBreakpoint = useBreakpoint(768);
 *
 *   return (
 *     <div>
 *       {isAboveBreakpoint ? 'Viewport width is above the breakpoint' : 'Viewport width is below the breakpoint'}
 *     </div>
 *   );
 * }
 */
const useBreakpoint = (breakpoint: number) => {
  const [isActive, setIsActive] = useState(false)
  const mediaQuery = useRef<MediaQueryList | null>(null)

  useEffect(() => {
    mediaQuery.current = window.matchMedia(`(min-width: ${breakpoint}px)`)
    setIsActive(mediaQuery.current.matches)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!mediaQuery.current) {
      return
    }

    const queryHandler = ({ matches }: MediaQueryListEvent) =>
      setIsActive(matches)

    mediaQuery.current.addEventListener('change', queryHandler)

    return () => {
      if (!mediaQuery.current) {
        return
      }

      mediaQuery.current.removeEventListener('change', queryHandler)
    }
  }, [breakpoint, setIsActive])

  return isActive
}

export default useBreakpoint
