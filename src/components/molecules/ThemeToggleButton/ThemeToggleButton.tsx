'use client'
import clsx from 'clsx'
import styles from './ThemeToggleButton.module.css'
import { Skeleton, ToggleButton } from '@/components'
import {
  FiMoon as DarkModeIcon,
  FiSun as LightModeIcon,
  FiMonitor as SystemModeIcon,
} from 'react-icons/fi'
import type { ThemeToggleButtonProps } from './ThemeToggleButton.types'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export const ThemeToggleButton = (props: ThemeToggleButtonProps) => {
  const { className, ...restProps } = props
  const { setTheme, systemTheme, theme } = useTheme()

  // Ref: https://github.com/pacocoursey/next-themes?tab=readme-ov-file#avoid-hydration-mismatch
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
  const setSystemTheme = () => systemTheme && setTheme(systemTheme)

  if (!mounted) {
    return (
      <div className={styles.container}>
        <Skeleton className={styles.skeletonToggle} />
        <Skeleton className={styles.skeletonCheckbox} />
      </div>
    )
  }

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
