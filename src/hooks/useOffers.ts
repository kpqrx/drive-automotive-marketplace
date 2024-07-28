import useOfferParameters from './useOfferParameters'
import useSWR from 'swr'
import { getOffers } from '@/lib'

function useOffers() {
  const { parameters } = useOfferParameters()

  const offers = useSWR(parameters, () => getOffers(parameters), {
    refreshWhenOffline: false,
  })

  return {
    offers,
    offersCount: offers.data?.length ?? 0,
  }
}

export default useOffers
