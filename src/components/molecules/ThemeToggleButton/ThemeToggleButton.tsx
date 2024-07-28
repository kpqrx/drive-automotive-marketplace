'use client'
import clsx from 'clsx'
import styles from './ThemeToggleButton.module.css'
import { ToggleButton } from '@/components'
import {
  FiMoon as DarkModeIcon,
  FiSun as LightModeIcon,
  FiMonitor as SystemModeIcon,
} from 'react-icons/fi'
import { useThemeHandler } from '@/hooks'
import type { ThemeToggleButtonProps } from './ThemeToggleButton.types'

export const ThemeToggleButton = (props: ThemeToggleButtonProps) => {
  const { className, ...restProps } = props
  const {
    currentTheme,
    isSystemDarkModeEnabled,
    toggleTheme,
    toggleSystemMode,
  } = useThemeHandler()

  // TODO: Update visuals
  return (
    <div
      className={clsx(styles.container, className)}
      {...restProps}
    >
      <ToggleButton
        onToggle={toggleTheme}
        isToggled={
          currentTheme === 'system'
            ? !isSystemDarkModeEnabled
            : currentTheme === 'light'
        }
        icons={[LightModeIcon, DarkModeIcon]}
        labels={['Light mode', 'Dark mode']}
        position="horizontal"
      />
      <label
        className={clsx(
          styles.systemModeCheckbox,
          currentTheme === 'system' && styles.systemModeCheckboxChecked,
        )}
      >
        <input
          type="checkbox"
          className={styles.systemModeCheckboxInput}
          defaultChecked={currentTheme === 'system'}
          onChange={toggleSystemMode}
        />
        <SystemModeIcon />
      </label>
    </div>
  )
}
