'use client'
import React, { useEffect, useState } from 'react'
import styles from './OfferDiscussionSection.module.css'
import type { OfferDiscussionSectionProps } from './OfferDiscussionSection.types'
import clsx from 'clsx'
import {
  ChevronRightIcon as ChevronIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { Avatar, Button } from '@/components'
import { Modal } from '../Modal/Modal'
import { useUserStore } from '@/store'
import { HiOutlineUser as UserIcon } from 'react-icons/hi2'
import useSWR from 'swr'
import {
  deleteComment,
  getCommentsByOfferId,
  postComment,
  signOut,
} from '@/lib'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { parseComment } from '@/utils'
import { useRouter } from 'next/navigation'

const getRandomId = () => Math.floor(Math.random() * 1000)

type AddCommentFormType = {
  comment: string
}

export const OfferDiscussionSection = (props: OfferDiscussionSectionProps) => {
  const { className = '', offerId, ...restProps } = props

  const { data, mutate } = useSWR(offerId, getCommentsByOfferId)
  const { replace } = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const { userId, firstName, lastName } = useUserStore()

  useEffect(() => {
    if (window.location.hash === '#discussion') {
      setIsOpen(true)
    }
  }, [data])

  const { handleSubmit, register, resetField } = useForm<AddCommentFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      comment: '',
    },
  })

  const handleAddComment: SubmitHandler<AddCommentFormType> = async ({
    comment: newCommentContent,
  }) => {
    try {
      const newComment: ReturnType<typeof parseComment> = {
        id: getRandomId(),
        author: `${firstName} ${lastName}`,
        authorId: userId,
        content: newCommentContent,
        date: new Date().toISOString(),
      }

      // @ts-ignore
      mutate(postComment(offerId, newCommentContent), {
        optimisticData: (cachedComments = []) => {
          return [...cachedComments, newComment]
        },
        populateCache: false,
      })

      resetField('comment')
    } catch (error) {
      signOut()
      replace('/sign-in')
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    try {
      // @ts-ignore
      mutate(deleteComment(commentId), {
        optimisticData: (cachedComments = []) => {
          return cachedComments.filter((comment) => comment.id !== commentId)
        },
        populateCache: false,
      })
    } catch (error) {
      signOut()
      replace('/sign-in')
    }
  }

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
          {data?.map((comment) => {
            const date = new Date(comment.date).toLocaleString('pl-PL', {
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
                {userId === comment.authorId && (
                  <button
                    className={styles.commentDeleteButton}
                    type="button"
                    aria-label="Usuń komentarz"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    <TrashIcon />
                  </button>
                )}
              </li>
            )
          })}
        </ul>

        {userId ? (
          <form
            className={styles.commentForm}
            onSubmit={handleSubmit(handleAddComment)}
          >
            <textarea
              {...register('comment')}
              className={styles.commentInput}
              placeholder="Zadaj pytanie..."
            />
            <Button
              type="submit"
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
