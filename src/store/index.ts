import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { createUserStore, type UserStore } from './user'

export const useUserStore = create<UserStore>()(
  devtools(
    subscribeWithSelector(
      persist((...args) => createUserStore(...args), {
        name: 'user-store',
      }),
    ),
  ),
)
