import type { OfferDescriptionProps } from './OfferDescription.types'
import styles from './OfferDescription.module.css'
import { remark } from 'remark'
import html from 'remark-html'

// TODO: fetch from API, parse on server
const parseContent = async (rawContent: string) => {
  const content = await remark().use(html).process(rawContent)
  return content.toString()
}

export const OfferDescription = async (props: OfferDescriptionProps) => {
  const { data, ...restProps } = props
  const content = await parseContent(data)

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
