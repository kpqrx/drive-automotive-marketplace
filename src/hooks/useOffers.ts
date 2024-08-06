import useOfferParameters from './useOfferParameters'
import useSWR from 'swr'
import { getOffers } from '@/lib'
import { useMemo } from 'react'

function useOffers() {
  const { parameters } = useOfferParameters()

  const offers = useSWR(parameters, () => getOffers(parameters), {
    refreshWhenOffline: false,
  })

  return useMemo(
    () => ({
      offers,
      offersCount: offers.data?.length ?? 0,
    }),
    [offers],
  )
}

export default useOffers
