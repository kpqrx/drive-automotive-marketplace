'use client'
import React, { useState } from 'react'
import styles from './OfferDiscussionSection.module.css'
import type { OfferDiscussionSectionProps } from './OfferDiscussionSection.types'
import clsx from 'clsx'
import { ChevronRightIcon as ChevronIcon } from '@heroicons/react/24/outline'
import { Avatar, Button } from '@/components'
import { Modal } from '../Modal/Modal'
import { useUserStore } from '@/store'
import { HiOutlineUser as UserIcon } from 'react-icons/hi2'

const getRandomTimestamp = () => {
  const startTime = new Date('1970-01-01T00:00:00Z').getTime()
  const endTime = Date.now()
  return Math.floor(Math.random() * (endTime - startTime + 1)) + startTime
}

const MOCK_COMMENTS = [
  {
    author: 'Jan Fasola',
    content: 'Czy kierownicę można zdemontować?',
    date: getRandomTimestamp(),
  },
  {
    author: 'Karol Krawczyk',
    content: 'Wygodniejszy od tramwaju?',
    date: getRandomTimestamp(),
  },
  {
    author: 'Sebastian Penerski',
    content: 'Czy można nakurwiać bączki na parkingu?',
    date: getRandomTimestamp(),
  },
  {
    author: 'Paweł Skoczek',
    content: 'Czy jak zjadę po schodach to coś się stanie?',
    date: getRandomTimestamp(),
  },
]

export const OfferDiscussionSection = (props: OfferDiscussionSectionProps) => {
  const { className = '', ...restProps } = props

  const [isOpen, setIsOpen] = useState(false)
  const { userId } = useUserStore()

  return (
    <section
      className={clsx(className, styles.container)}
      {...restProps}
    >
      <div className={styles.avatarsList}>
        <Avatar fullName={['A', 'B']} />
        <Avatar fullName={['C', 'D']} />
        <Avatar fullName={['E', 'F']} />
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
        <ul className={styles.commentsWrapper}>
          {MOCK_COMMENTS.map((comment) => {
            const date = new Date(comment.date * 1000).toLocaleString('pl-PL', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })
            const [firstName, lastName] = comment.author.split(' ')

            return (
              <li
                className={styles.comment}
                key={comment.date}
              >
                <Avatar
                  className={styles.commentAvatar}
                  fullName={[firstName, lastName]}
                />
                <div className={styles.commentContent}>
                  <span className={styles.commentAuthor}>{comment.author}</span>
                  <p className={styles.commentText}>{comment.content}</p>
                  <span className={styles.commentDate}>{date}</span>
                </div>
              </li>
            )
          })}
        </ul>

        {userId ? (
          <form className={styles.commentForm}>
            <textarea
              className={styles.commentInput}
              placeholder="Napisz komentarz..."
            />
            <Button
              className={styles.commentButton}
              size="small"
            >
              Wyślij
            </Button>
          </form>
        ) : (
          <p className={styles.signInNotice}>
            <UserIcon className={styles.userIcon} />
            Zaloguj się aby zadać pytanie
          </p>
        )}
      </Modal>
    </section>
  )
}
