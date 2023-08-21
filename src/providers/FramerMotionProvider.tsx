'use client'
import { LazyMotion, domMax } from 'framer-motion'
import type { PropsWithChildren } from 'react'

const FramerMotionProvider = ({ children }: PropsWithChildren) => (
  <LazyMotion features={domMax}>{children}</LazyMotion>
)

export default FramerMotionProvider
