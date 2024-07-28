'use client'
import clsx from 'clsx'
import styles from './ToggleButton.module.css'
import { useState, useCallback } from 'react'
import type { Transition } from 'framer-motion'
import { m } from 'framer-motion'
import type { ToggleButtonProps } from './ToggleButton.types'

const iconTransition: Transition = {
  type: 'spring',
  damping: 18,
  stiffness: 280,
}

export function ToggleButton(props: ToggleButtonProps) {
  const {
    className,
    onToggle,
    icons: [DefaultIcon, ToggledIcon],
    labels: [defaultLabel, toggledLabel],
    position = 'horizontal',
    defaultToggled = false,
    isToggled: externalIsToggled,
    ...restProps
  } = props
  const [isToggled, setIsToggled] = useState(defaultToggled)

  const handleOnClick = useCallback(() => {
    onToggle()
    setIsToggled((prevState) => !prevState)
  }, [onToggle, setIsToggled])

  // TODO: Add tooltip labels
  return (
    <button
      className={clsx(
        className,
        styles.container,
        (externalIsToggled ?? isToggled) && styles.containerIsToggled,
        position === 'vertical' && styles.containerVertical,
      )}
      onClick={handleOnClick}
      aria-label={isToggled ? toggledLabel : defaultLabel}
      {...restProps}
    >
      <m.span
        layout
        transition={iconTransition}
        className={clsx(styles.iconWrapper)}
      >
        {externalIsToggled ?? isToggled ? <ToggledIcon /> : <DefaultIcon />}
      </m.span>
    </button>
  )
}
