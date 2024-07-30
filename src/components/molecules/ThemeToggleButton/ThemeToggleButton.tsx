'use client'
import clsx from 'clsx'
import styles from './ThemeToggleButton.module.css'
import { ToggleButton } from '@/components'
import {
  FiMoon as DarkModeIcon,
  FiSun as LightModeIcon,
  FiMonitor as SystemModeIcon,
} from 'react-icons/fi'
import type { ThemeToggleButtonProps } from './ThemeToggleButton.types'
import { useTheme } from 'next-themes'

export const ThemeToggleButton = (props: ThemeToggleButtonProps) => {
  const { className, ...restProps } = props
  const { setTheme, systemTheme, theme } = useTheme()

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
  const setSystemTheme = () => systemTheme && setTheme(systemTheme)

  // TODO: Update visuals
  return (
    <div
      className={clsx(styles.container, className)}
      {...restProps}
    >
      <ToggleButton
        onToggle={toggleTheme}
        isToggled={theme === 'dark'}
        icons={[DarkModeIcon, LightModeIcon]}
        labels={['Dark mode', 'Light mode']}
        position="horizontal"
      />
      <label
        className={clsx(
          styles.systemModeCheckbox,
          theme === systemTheme && styles.systemModeCheckboxChecked,
        )}
      >
        <input
          type="checkbox"
          className={styles.systemModeCheckboxInput}
          defaultChecked={theme === systemTheme}
          onChange={setSystemTheme}
        />
        <SystemModeIcon />
      </label>
    </div>
  )
}
