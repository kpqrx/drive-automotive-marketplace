import type { EventHandler, ReactEventHandler, SyntheticEvent } from 'react'

/**
 *
 * @param {EventHandler<SyntheticEvent>[]} handlers - React event handlers
 * @returns Event handler aggregating provided handlers
 */
const mergeEventHandlers =
  (...handlers: (ReactEventHandler<HTMLElement> | undefined)[]) =>
  (event: SyntheticEvent<HTMLElement>) => {
    handlers.forEach((handler) => {
      if (typeof handler === 'function') handler(event)
    })
  }

export default mergeEventHandlers
