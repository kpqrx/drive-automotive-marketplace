'use client'
import { OfferTile, Skeleton } from '@/components'
import { useToast } from '@/hooks'
import { getOwnerOffers } from '@/lib'
import { useUserStore } from '@/stores'
import { getIconByManufacturer } from '@/utils'
import { useEffect } from 'react'
import { LiaCarSideSolid } from 'react-icons/lia'
import useSWR from 'swr'

export default function UserProfileOwnerOffers() {
  const { userId } = useUserStore()
  const { data, error, isLoading, mutate } = useSWR(
    `/owned-offers/${userId}`,
    () => getOwnerOffers(userId),
  )

  const { toast } = useToast()

  useEffect(() => {
    if (!isLoading && window.location.hash === '#new-offer') {
      toast({
        status: 'success',
        title: 'Oferta została dodana pomyślnie',
      })
    }
  }, [isLoading, toast])

  const handleDeleteOffer = async (offerId: number) => {
    try {
      // @ts-ignore
      await mutate(deleteOffer(offerId), {
        optimisticData: (cachedOffers = []) => {
          return cachedOffers.filter((offer) => offer.id !== offerId)
        },
        populateCache: false,
      })
      toast({
        title: 'Oferta została usunięta',
        status: 'success',
      })
    } catch (error) {
      toast({
        title: 'Wystąpił błąd podczas usuwania oferty',
        description: 'Spróbuj ponownie później',
        status: 'error',
      })
    }
  }

  return (
    <div>
      <h2 className="mb-10 flex items-center text-2xl">
        Dodane ogłoszenia
        {data && (
          <span className="ml-4 h-auto rounded-xl bg-orange-400 p-0.5 px-3 text-sm font-bold text-black">
            {data.length}
          </span>
        )}
      </h2>
      {data && data.length === 0 && (
        <div className="flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-600">
          <LiaCarSideSolid className="mb-6 size-20" />
          <h3 className="text-2xl font-medium">
            Nie dodano jeszcze żadnych ofert.
          </h3>
        </div>
      )}
      {data && data.length > 0 && (
        <ul className="flex flex-col gap-6">
          {data.map((offer) => (
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
                withLikeButton={false}
                withDeleteButton
                onDeleteButtonClick={() => handleDeleteOffer(offer.id)}
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
