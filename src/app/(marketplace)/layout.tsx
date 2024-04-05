import { Header } from '@/components/organisms/Header/Header'

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
