'use client'
import React from 'react'
import styles from './Tooltip.module.css'
import type { TooltipProps } from '@/components/molecules/Tooltip/Tooltip.types'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import clsx from 'clsx'

export const Tooltip = (props: TooltipProps) => {
  const {
    children,
    content,
    className,
    delayDuration = 50,
    side,
    ...restProps
  } = props

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root
        delayDuration={delayDuration}
        {...restProps}
      >
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

        <TooltipPrimitive.Content
          className={clsx(className, styles.content)}
          side={side}
        >
          {content}
          <TooltipPrimitive.Arrow className={styles.arrow} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
