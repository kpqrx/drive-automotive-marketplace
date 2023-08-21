import type {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
} from 'react'

export interface ModalProps extends PropsWithChildren {
  title: string
  renderBeforeTitle?: ReactNode
  renderAfterTitle?: ReactNode
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
