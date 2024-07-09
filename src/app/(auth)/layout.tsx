import { Container } from '@/components'
import { Header } from '@/components/organisms/Header/Header'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      <Header withMenu={false} />
      {children}
    </Container>
  )
}
