import React from 'react'
import styles from './DiscussionCallToAction.module.css'
import type { DiscussionCallToActionProps } from './DiscussionCallToAction.types'
import clsx from 'clsx'
import { ChevronRightIcon as ChevronIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components'

export const DiscussionCallToAction = (props: DiscussionCallToActionProps) => {
  const { className = '', ...restProps } = props

  return (
    <section
      className={clsx(className, styles.container)}
      {...restProps}
    >
      <div className={styles.avatarsList}>
        <img
          className={styles.avatar}
          alt="Avatar"
        />
        <img
          className={styles.avatar}
          alt="Avatar"
        />
        <img
          className={styles.avatar}
          alt="Avatar"
        />
      </div>
      <p className={styles.heading}>Masz pytanie do właściciela?</p>
      <p className={styles.text}>Dołącz do dyskusji i zobacz pytania innych.</p>
      <Button className={styles.button}>
        Przejdź do dyskusji <ChevronIcon />
      </Button>
    </section>
  )
}
