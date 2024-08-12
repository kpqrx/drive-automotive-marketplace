import { Button } from '@/components'
import { TbConfetti as SuccessIcon } from 'react-icons/tb'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pt-32">
      <SuccessIcon className="mb-10 size-24 text-orange-400" />
      <h1 className="mb-4 text-4xl font-semibold">Ogłoszenie zostało dodane</h1>
      <p className="mb-24 text-xl">Płatność zakończona sukcesem</p>

      <Button href="/user-profile/my-offers">Przejdź do Twoich ogłoszeń</Button>
    </div>
  )
}
