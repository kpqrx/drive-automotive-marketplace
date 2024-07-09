import { type StateCreator } from 'zustand'

export type UserStore = {
  firstName: string
  lastName: string
  email: string
  userId: string
  removeUser: () => void
  setUser: (value: UserStoreValue) => void
}

const defaultValue: Omit<UserStore, 'removeUser' | 'setUser'> = {
  firstName: '',
  lastName: '',
  email: '',
  userId: '',
}

type UserStoreValue = typeof defaultValue

export const createUserStore: StateCreator<
  UserStore,
  [['zustand/devtools', never]],
  []
> = (set) => ({
  ...defaultValue,
  removeUser: () => set(() => defaultValue),
  setUser: (value: UserStoreValue) => set(() => value),
})
