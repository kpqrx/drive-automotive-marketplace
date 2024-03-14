import { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

type ReturnType<T> = {
  ref: RefObject<T>
  rect: DOMRect
}
type OptionsType = {
  instanceId?: string
  ref: RefObject<HTMLElement>
}

/**
 * A hook that returns a ref to an HTMLElement and its bounding rectangle.
 * The bounding rectangle is updated on mount and on window resize.
 * @template {T extends HTMLElement} The type of the HTML element.
 * @returns {ReturnType<T>} An array containing the ref, the current bounding rectangle, and the function to force measurements.
 */

function useBoundingRect<T extends HTMLElement>(
  options?: OptionsType,
): ReturnType<T> {
  const { instanceId } = options || {}

  const ref = useRef<T>(null)
  const [boundingRect, setBoundingRect] = useState<DOMRect>(
    new DOMRect(undefined, undefined, undefined, undefined),
  )

  const handleMeasure = useCallback((element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    setBoundingRect(rect)
  }, [])

  useEffect(() => {
    const element = ref.current

    if (!element || !window) {
      return
    }
    handleMeasure(element)
    window.addEventListener('resize', () => handleMeasure(element))
    window.addEventListener(`measure:${instanceId}-rect`, () =>
      handleMeasure(element),
    )
    return () =>
      window.removeEventListener('resize', () => handleMeasure(element))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    ref,
    rect: boundingRect,
  }
}

export default useBoundingRect
