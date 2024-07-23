import { OffersListing } from '@/components'
import { OffersTitleBlock } from '@/components/organisms/OffersTitleBlock/OffersTitleBlock'

export default async function ListingPage() {
  return (
    <main>
      <OffersTitleBlock />
      <OffersListing />
    </main>
  )
}
