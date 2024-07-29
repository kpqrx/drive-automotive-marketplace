'use client'
import React, { useState } from 'react'
import styles from './DiscussionCallToAction.module.css'
import type { DiscussionCallToActionProps } from './DiscussionCallToAction.types'
import clsx from 'clsx'
import { ChevronRightIcon as ChevronIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components'
import { Modal } from '../Modal/Modal'
import Image from 'next/image'

export const DiscussionCallToAction = (props: DiscussionCallToActionProps) => {
  const { className = '', ...restProps } = props

  const [isOpen, setIsOpen] = useState(false)

  return (
    <section
      className={clsx(className, styles.container)}
      {...restProps}
    >
      <div className={styles.avatarsList}>
        <Image
          src=""
          className={styles.avatar}
          alt="Avatar"
        />
        <Image
          src=""
          className={styles.avatar}
          alt="Avatar"
        />
        <Image
          src=""
          className={styles.avatar}
          alt="Avatar"
        />
      </div>
      <p className={styles.heading}>Masz pytanie do właściciela?</p>
      <p className={styles.text}>Dołącz do dyskusji i zobacz pytania innych.</p>
      <Button
        className={styles.button}
        onClick={() => setIsOpen(true)}
      >
        Przejdź do dyskusji <ChevronIcon />
      </Button>
      <Modal
        label="Dyskusja"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        TODO
        {
          // comments:
          // - author
          // - content
          // - date
          // submit form:
          // - textarea
          // - button
        }
      </Modal>
    </section>
  )
}
