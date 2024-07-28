import type { ThemeType } from '@/types'
import type { StateCreator } from 'zustand'

export type SettingsStoreType = {
  theme: ThemeType
  setTheme: (value: ThemeType) => void
}

export const createSettingsStore: StateCreator<
  SettingsStoreType,
  [
    ['zustand/devtools', never],
    ['zustand/persist', unknown],
    ['zustand/subscribeWithSelector', never],
  ],
  [],
  SettingsStoreType
> = (set) => ({
  theme: 'system',
  setTheme: (theme) => set({ theme }),
})

export const settingsStoreOptions = {
  name: 'settings-store',
}
