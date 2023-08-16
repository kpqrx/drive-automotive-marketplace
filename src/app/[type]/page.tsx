import styles from '../../styles/home.module.css'
import { Breadcrumbs } from '@/components/atoms/Breadcrumbs/Breadcrumbs'

export default function Listing() {
  return (
    <div className={styles.container}>
      <Breadcrumbs
        items={[
          { label: 'Osobowe', path: '#' },
          { label: 'Limuzyna', path: '#' },
        ]}
      />
      <h1 className="text-4xl font-semibold">BMW M6</h1>
      <h2>3642 ogłoszeń</h2>
    </div>
  )
}
