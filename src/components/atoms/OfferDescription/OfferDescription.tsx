import type { OfferDescriptionProps } from './OfferDescription.types'
import styles from './OfferDescription.module.css'
import { remark } from 'remark'
import html from 'remark-html'

// TODO: fetch from API, parse on server
const getContent = async () => {
  const parsedContent = await remark().use(html).process(`
## BMW Seria 6 Gran Coupe

Samochód wyprodukowany w 2019 roku, z przebiegiem 45,000 km. Auto wyposażone jest w silnik 3.0L R6 Turbo o mocy 315 KM, zasilane benzyną. Posiada automatyczną, 8-biegową skrzynię biegów oraz napęd na tylne koła (RWD). Kolor nadwozia to czarny metalik, a wnętrze wykończone jest skórzaną tapicerką w kolorze brązowym.

### Wyposażenie

Auto posiada Pakiet M Sport, adaptacyjne zawieszenie, system multimedialny iDrive oraz nawigację satelitarną. Dodatkowo, samochód wyposażony jest w kamerę cofania, asystenta parkowania, system nagłośnienia Harman/Kardon, podgrzewane i wentylowane fotele przednie, klimatyzację czterostrefową, system bezkluczykowego dostępu, czujniki parkowania przód i tył, reflektory LED adaptacyjne oraz tempomat aktywny z funkcją Stop&Go.

### Stan techniczny

Samochód w idealnym stanie technicznym i wizualnym. Regularnie serwisowany w ASO BMW, ostatni przegląd wykonany przy 40,000 km. Nigdy nie uczestniczył w wypadku, lakier w fabrycznym stanie, bez uszkodzeń.

### Dodatkowe informacje

BMW Seria 6 Gran Coupe to połączenie elegancji, sportowych osiągów oraz luksusu. Auto jest niezwykle komfortowe zarówno na długie trasy, jak i do codziennego użytkowania. Oferuje przestronne wnętrze, bogate wyposażenie oraz dynamiczne osiągi, co czyni je idealnym wyborem dla wymagających kierowców.
`)
  return parsedContent.toString()
}
export const OfferDescription = async (props: OfferDescriptionProps) => {
  const { ...restProps } = props
  const content = await getContent()

  return (
    <div
      data-testid="offer-description"
      {...restProps}
    >
      <article
        className={styles.wrapper}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
