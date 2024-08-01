import { Breadcrumbs, Container } from '@/components'
import Link from 'next/link'
import { HeartIcon, BookOpenIcon } from '@heroicons/react/24/outline'

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container as="main">
      <Breadcrumbs
        items={[
          { label: 'Strona główna', path: '/' },
          { label: 'Profil użytkownika', path: '/user-profile' },
        ]}
      />

      <div className="mt-24 flex gap-12">
        <div className="space-y-6">
          <h2 className="text-xl">Nawigacja:</h2>
          <ul className="ml-4 min-w-80 space-y-5">
            <li>
              <Link
                className="transition-colors hover:text-orange-400"
                href="/user-profile/my-offers"
              >
                <BookOpenIcon className="mr-3 inline size-5" />
                Moje ogłoszenia
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-orange-400"
                href="/user-profile/liked-offers"
              >
                <HeartIcon className="mr-3 inline size-5" />
                Polubione ogłoszenia
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-1">{children}</div>
      </div>
    </Container>
  )
}
