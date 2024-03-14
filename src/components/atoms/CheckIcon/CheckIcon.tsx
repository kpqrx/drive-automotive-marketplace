'use client'
import { m } from 'framer-motion'
import type { SVGProps } from 'react'

export const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      {...props}
    >
      <m.path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        exit={{ pathLength: 0 }}
      />
    </svg>
  )
}
