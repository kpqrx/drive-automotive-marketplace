import type { SVGProps } from 'react'
import styles from './Logo.module.css'
import { m } from 'framer-motion'
import type { Variants, Transition, MotionProps } from 'framer-motion'

const signVariants: Variants = {
  initial: {
    x: -2,
    skewX: 0,
    scaleX: 0.95,
    opacity: 0,
  },
  animate: {
    x: [null, 2],
    skewX: '-8deg',
    scaleX: 1,
    opacity: 1,
  },
}

const signTransition: Transition = {
  x: {
    type: 'spring',
    stiffness: 300,
    mass: 0.5,
    damping: 12,
  },
  skewX: { delay: 0.35 },
  scaleX: { delay: 0.4 },
}

const typographyVariants: Variants = {
  initial: {
    x: -12,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
}

const typographyTransition: Transition = {
  delay: 0.4,
}

interface LogoProps
  extends SVGProps<SVGSVGElement>,
    Pick<MotionProps, 'initial'> {}

export const Logo = (props: LogoProps) => {
  const { initial = 'initial', ...restProps } = props

  return (
    <svg
      width="66"
      height="24"
      viewBox="0 0 58 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <m.rect
        className={styles.sign}
        width={12}
        height={24}
        x={2}
        variants={signVariants}
        transition={signTransition}
        initial={initial}
        animate="animate"
      />
      <m.path
        className={styles.typography}
        d="M19.317 11.766c0 1.28-.263 2.343-.79 3.19-.526.848-1.269 1.485-2.228 1.912-.953.421-2.075.632-3.367.632H9v-11h4.207c1.308 0 2.416.203 3.325.61.909.405 1.6 1 2.07 1.782.477.783.715 1.74.715 2.874Zm-3.408.106c0-.667-.1-1.22-.3-1.655a2.003 2.003 0 0 0-.88-.986c-.394-.22-.89-.331-1.49-.331h-.955v6.162h.731c.998 0 1.73-.261 2.195-.783.466-.526.699-1.329.699-2.407ZM25.486 6.5c1.103 0 2.02.123 2.752.368.731.241 1.28.602 1.646 1.084.371.481.557 1.08.557 1.798 0 .446-.083.853-.25 1.219a3.101 3.101 0 0 1-.715.986c-.305.285-.67.536-1.097.752L31.92 17.5h-3.724l-2.577-4.003h-.832V17.5h-3.283v-11h3.982Zm-.05 2.25h-.649v2.512h.616c.504 0 .917-.1 1.238-.3.322-.201.483-.56.483-1.077 0-.356-.133-.634-.4-.835-.265-.2-.695-.3-1.288-.3Zm7.59 8.75v-11h3.3v11h-3.3Zm16.436-11-3.982 11h-3.866l-3.965-11h3.69l1.655 5.575c.061.21.13.481.208.813.083.325.158.652.224.978.072.326.117.591.133.797.023-.206.064-.469.125-.79.061-.32.128-.642.2-.963.077-.326.15-.594.216-.805L45.787 6.5h3.675ZM58 17.5h-7.216v-11H58v2.385h-3.932v1.73h3.641V13h-3.641v2.077H58V17.5Z"
        variants={typographyVariants}
        transition={typographyTransition}
        initial={initial}
        animate="animate"
      />
    </svg>
  )
}
