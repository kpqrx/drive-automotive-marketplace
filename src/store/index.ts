import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { createUserStore, type UserStore, userStoreOptions } from './user'
import {
  createOfferParametersStore,
  type OfferParameters,
  offerParametersStoreOptions,
} from './offerParameters'

export const useUserStore = create<UserStore>()(
  devtools(persist((...args) => createUserStore(...args), userStoreOptions)),
)

export const useOfferParametersStore = create<OfferParameters>()(
  devtools(
    (...args) => createOfferParametersStore(...args),
    offerParametersStoreOptions,
  ),
)
