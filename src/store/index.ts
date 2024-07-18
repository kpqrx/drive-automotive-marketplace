import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createUserStore, type UserStore, userStoreOptions } from './user'

export const useUserStore = create<UserStore>()(
  devtools(persist((...args) => createUserStore(...args), userStoreOptions)),
)
