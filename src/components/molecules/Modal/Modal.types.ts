import type {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
} from 'react'

export interface ModalProps extends PropsWithChildren {
  contextButtonLabel?: ReactNode
  contextButtonCallback?: (...args: any) => void
  label: string
  headerSlot?: ReactNode
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>> | ((state: boolean) => void)
}
