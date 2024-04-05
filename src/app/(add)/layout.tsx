import { Header } from '@/components/organisms/Header/Header'
import styles from '@/styles/addOffer.module.css'

export default function AddOfferLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header
        className={styles.header}
        label="Dodaj ogłoszenie"
        withMenu={false}
      />
      {children}
    </>
  )
}
