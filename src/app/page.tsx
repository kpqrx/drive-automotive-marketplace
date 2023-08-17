import { VehicleSearchTabs } from '@/components/organisms/VehicleSearchTabs/VehicleSearchTabs'
import styles from '../styles/home.module.css'
import { TimedCarousel } from '@/components/atoms/TimedCarousel/TimedCarousel'
import { Container } from '@/components/atoms/Container/Container'

export default function Home() {
  return (
    <Container as="main">
      <div className={styles.heroWrapper}>
        <h1 className={styles.heroHeadingPrimary}>
          Now
          <TimedCarousel
            items={[
              <>
                y <span className={styles.heroHeadingAccent}>samochód</span>
              </>,
              <>
                y <span className={styles.heroHeadingAccent}>motocykl</span>
              </>,
              <>
                a <span className={styles.heroHeadingAccent}>ciężarówka</span>
              </>,
            ]}
          />
          ? Mamy to!
        </h1>
        <h2 className={styles.heroHeadingSecondary}>Przekonaj się!</h2>
      </div>
      <div className={styles.formWrapper}>
        <VehicleSearchTabs />
      </div>
    </Container>
  )
}
