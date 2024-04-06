import type { RefObject, Ref, LegacyRef } from 'react'

type Mutable<T> = {
  -readonly [k in keyof T]: T[k]
}

/**
 *
 * @param {Ref<T>[]} refs - React referrence elements
 * @returns Referrence element aggregating provided refs
 */
const mergeRefs =
  // TODO: How to type this ref cholerstwo?!!

    <T extends HTMLElement>(...refs: (Ref<T> | undefined)[]): any =>
    (value: any) => {
      for (let i = 0; i < refs.length; i += 1) {
        const ref = refs[i]

        if (typeof ref === 'function') {
          ref(value)
        } else if (ref) {
          ;(ref as Mutable<RefObject<T>>).current = value
        }
      }
    }

export default mergeRefs
