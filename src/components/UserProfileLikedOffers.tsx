'use client'
import { OfferTile, Skeleton } from '@/components'
import { useOffers, useToast } from '@/hooks'
import { getLikedOffersByUserId, removeOfferFromLiked } from '@/lib'
import { useUserStore } from '@/stores'
import { getIconByManufacturer } from '@/utils'
import { LiaCarSideSolid } from 'react-icons/lia'
import useSWR from 'swr'

export default function UserProfileLikedOffers() {
  const { userId } = useUserStore()
  const { data, isLoading, error, mutate } = useSWR(
    `/liked-offers/${userId}`,
    () => getLikedOffersByUserId(userId),
    { refreshInterval: 0 },
  )
  const { offers } = useOffers()

  const likedOffers = offers.data?.filter(({ id }) => data?.includes(id))

  const { toast } = useToast()

  const handleOnLikeButtonClick = async (offerId: number) => {
    try {
      // @ts-ignore
      await mutate(removeOfferFromLiked(offerId), {
        optimisticData: (cachedOffers = []) => {
          return cachedOffers.filter((offer) => offer.id !== offerId)
        },
        populateCache: false,
      })
      toast({
        title: 'Oferta została usunięta z polubionych',
        status: 'success',
      })
    } catch (error) {
      toast({
        title: 'Wystąpił błąd podczas usuwania oferty z ulubionych',
        description: 'Spróbuj ponownie później',
        status: 'error',
      })
    }
  }

  return (
    <div>
      <h2 className="mb-10 flex items-center text-2xl">
        Polubione ogłoszenia
        {likedOffers && (
          <span className="ml-4 h-auto rounded-xl bg-orange-400 p-0.5 px-3 text-sm font-bold text-black">
            {likedOffers.length}
          </span>
        )}
      </h2>
      {likedOffers && likedOffers.length === 0 && (
        <div className="flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-600">
          <LiaCarSideSolid className="mb-6 size-20" />
          <h3 className="text-2xl font-medium">
            Nie polubiono jeszcze żadnych ofert.
          </h3>
        </div>
      )}
      {likedOffers && likedOffers.length > 0 && (
        <ul className="flex flex-col gap-6">
          {likedOffers.map((offer) => (
            <li
              key={offer.slug}
              className="w-full"
            >
              <OfferTile
                orientation="horizontal"
                href={`/offer/${offer.slug}`}
                label={offer.label}
                icon={getIconByManufacturer(offer.manufacturer)}
                title={offer.summary}
                location={[offer.user.city, offer.user.voivodeship]
                  .filter(Boolean)
                  .join(', ')}
                price={offer.price}
                thumbnailSrc={offer.thumbnailUrl}
                properties={Object.values(offer.properties)}
                isLiked
                onLikeButtonClick={() => handleOnLikeButtonClick(offer.id)}
              />
            </li>
          ))}
        </ul>
      )}
      {isLoading && (
        <>
          <Skeleton className="mb-6 h-[15.25rem] w-full" />
          <Skeleton className="h-[15.25rem] w-full" />
        </>
      )}
      {error && <p>Wystąpił błąd podczas ładowania danych</p>}
    </div>
  )
}
