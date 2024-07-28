import { useSettingsStore } from '@/store'
import type { ThemeType } from '@/types'
import { useCallback, useEffect, useState } from 'react'

function useThemeHandler() {
  const { theme: currentTheme, setTheme } = useSettingsStore()
  const [isSystemDarkModeEnabled, setIsSystemDarkModeEnabled] = useState(false)

  const handleThemeUpdate = useCallback(
    (requestedTheme: ThemeType) => {
      if (!window) {
        return
      }

      const documentElement = window.document.documentElement

      const shouldSetDarkMode =
        requestedTheme === 'system'
          ? isSystemDarkModeEnabled
          : requestedTheme === 'dark'

      if (shouldSetDarkMode) {
        documentElement.classList.add('dark')
        return
      }

      documentElement.classList.remove('dark')
    },
    [isSystemDarkModeEnabled],
  )

  const unsubscribeStore = useSettingsStore.subscribe(
    (state) => state.theme,
    handleThemeUpdate,
  )

  const toggleSystemMode = useCallback(() => {
    setTheme(
      currentTheme !== 'system'
        ? 'system'
        : isSystemDarkModeEnabled
        ? 'dark'
        : 'light',
    )
  }, [currentTheme, isSystemDarkModeEnabled, setTheme])

  const toggleTheme = useCallback(() => {
    const isCurrentThemeDark =
      (currentTheme === 'system' && isSystemDarkModeEnabled) ||
      currentTheme === 'dark'
    setTheme(isCurrentThemeDark ? 'light' : 'dark')
  }, [currentTheme, isSystemDarkModeEnabled, setTheme])

  useEffect(() => {
    if (!window) {
      return
    }

    const systemDarkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    )
    const handleSystemDarkModeChange = () => {
      currentTheme === 'system' && handleThemeUpdate('system')
      setIsSystemDarkModeEnabled(systemDarkModeMediaQuery.matches)
    }

    handleSystemDarkModeChange()
    systemDarkModeMediaQuery.addEventListener(
      'change',
      handleSystemDarkModeChange,
    )
    return () => {
      systemDarkModeMediaQuery.removeEventListener(
        'change',
        handleSystemDarkModeChange,
      )
    }
  }, [currentTheme, handleThemeUpdate])

  useEffect(() => {
    handleThemeUpdate(currentTheme)
    return () => unsubscribeStore()
  }, [unsubscribeStore, currentTheme, handleThemeUpdate])

  return {
    currentTheme,
    toggleTheme,
    toggleSystemMode,
    isSystemDarkModeEnabled,
  }
}
export default useThemeHandler
