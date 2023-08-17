import { Breadcrumbs } from '@/components/atoms/Breadcrumbs/Breadcrumbs'
import { Container } from '@/components/atoms/Container/Container'

export default function Listing() {
  return (
    <Container as="main">
      <Breadcrumbs
        items={[
          { label: 'Osobowe', path: '#' },
          { label: 'Limuzyna', path: '#' },
        ]}
      />
      <h1 className="text-4xl font-semibold">BMW M6</h1>
      <h2>3642 ogłoszeń</h2>
    </Container>
  )
}
