import type { ToastProps as ToastPrimitiveProps } from '@radix-ui/react-Toast'

export interface ToastProps extends ToastPrimitiveProps {
  title: string
  description?: string
  withCancelButton?: boolean
  status: 'success' | 'error'
}

export type ToastActionElement = {
  label: string
  onClick: () => void
}
