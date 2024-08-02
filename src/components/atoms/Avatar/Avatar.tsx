import React, { useMemo } from 'react'
import styles from './Avatar.module.css'
import type { AvatarProps } from '@/components/atoms/Avatar/Avatar.types'
import clsx from 'clsx'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { generatePastelColor } from '@/utils'

export const Avatar = (props: AvatarProps) => {
  const { children, className = '', src, fullName, ...restProps } = props
  const initials = fullName
    .map((name) => name[0])
    .join('')
    .toUpperCase()

  const backgroundColor = useMemo(() => generatePastelColor(), [])

  return (
    <AvatarPrimitive.Root
      suppressHydrationWarning // TO resolve SSR hydration mismatch
      className={clsx(className, styles.container)}
      style={{ backgroundColor }}
      data-testid="Avatar"
      {...restProps}
    >
      <AvatarPrimitive.Image src={src} />
      <AvatarPrimitive.Fallback className={styles.fallback}>
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}
