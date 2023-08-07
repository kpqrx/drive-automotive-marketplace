import { VehicleSearchTabs } from '@/components/organisms/VehicleSearchTabs/VehicleSearchTabs'
import styles from '../styles/home.module.css'
import { TextCarousel } from '@/components/atoms/TextCarousel/TextCarousel'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.heroWrapper}>
        <h1 className={styles.heroHeadingPrimary}>
          Nowy
          <TextCarousel
            className={styles.heroHeadingAccent}
            texts={['wóz', 'komarek', 'składak']}
          />
          ? Mamy go!
        </h1>
        <h2 className={styles.heroHeadingSecondary}>Przekonaj się!</h2>
      </div>
      <div className={styles.formWrapper}>
        <VehicleSearchTabs />
      </div>
    </div>
  )
}
