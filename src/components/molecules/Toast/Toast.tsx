'use client'
import React, { useEffect } from 'react'
import styles from './Toast.module.css'
import type { ToastProps } from '@/components/molecules/Toast/Toast.types'
import clsx from 'clsx'
import * as ToastPrimitive from '@radix-ui/react-toast'
import {
  XMarkIcon as CancelIcon,
  CheckCircleIcon as SuccessIcon,
  ExclamationCircleIcon as ErrorIcon,
} from '@heroicons/react/24/outline'
import { useToast } from '@/hooks'

export const Toast = (props: ToastProps) => {
  const {
    title,
    description,
    withCancelButton = false,
    status,
    className = '',
    ...restProps
  } = props

  const ToastIcon = status === 'success' ? SuccessIcon : ErrorIcon

  return (
    <ToastPrimitive.Root
      className={clsx(className, styles.container)}
      {...restProps}
    >
      <ToastIcon
        className={clsx(
          styles.icon,
          status === 'success' ? styles.iconSuccess : styles.iconError,
        )}
      />

      <div className={styles.content}>
        <ToastPrimitive.Title className={styles.title}>
          {title}
        </ToastPrimitive.Title>
        {description && (
          <ToastPrimitive.Description className={styles.description}>
            {description}
          </ToastPrimitive.Description>
        )}
      </div>

      {withCancelButton && (
        <ToastPrimitive.Close className={styles.cancelButton}>
          <CancelIcon className={styles.cancelButtonIcon} />
        </ToastPrimitive.Close>
      )}
    </ToastPrimitive.Root>
  )
}

export const Toaster = () => {
  const { toasts, toast } = useToast()

  useEffect(() => {
    const handleToastOnDeleteKey = (event: KeyboardEvent) => {
      if (event.key === 'Delete') {
        toast({
          status: 'success',
          title: 'Example toast',
          description: 'This is an example toast',
          withCancelButton: true,
        })
      }
    }
    window.addEventListener('keydown', handleToastOnDeleteKey)
    return () => window.removeEventListener('keydown', handleToastOnDeleteKey)
  }, [])

  return (
    <ToastPrimitive.Provider>
      {toasts.map(({ id, ...toastProps }) => (
        <Toast
          key={id}
          {...toastProps}
        />
      ))}
      <ToastPrimitive.Viewport className={styles.viewport} />
    </ToastPrimitive.Provider>
  )
}
