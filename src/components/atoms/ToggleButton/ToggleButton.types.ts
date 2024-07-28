import type { ComponentPropsWithoutRef } from 'react'
import type { IconType } from 'react-icons'

export interface ToggleButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'onClick'> {
  /** Callback to be called when button is clicked (toggled) */
  onToggle: () => void
  /** Tuple of icons to be displayed - default and toggled */
  icons: [defaultIconComponent: IconType, toggledIconComponent: IconType]
  /** Tuple of labels - default and toggled */
  labels: [defaultLabel: string, toggledLabel: string]
  /** Boolean to render the component initially toggled */
  defaultToggled?: boolean
  /** Position of the icon - horizontal or vertical */
  position?: 'horizontal' | 'vertical'
  /** If is defined the button is controlled programatically */
  isToggled?: boolean
}
