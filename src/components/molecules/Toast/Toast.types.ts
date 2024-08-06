import type { ToastProps as ToastPrimitiveProps } from '@radix-ui/react-toast'

export interface ToastProps extends ToastPrimitiveProps {
  title: string
  description?: string
  withCancelButton?: boolean
  status: 'success' | 'error'
  className?: string
}

export type ToastActionElement = {
  label: string
  onClick: () => void
}
