import type { AvatarProps as AvatarPrimitiveProps } from '@radix-ui/react-avatar'

export interface AvatarProps extends AvatarPrimitiveProps {
  src?: string
  fullName: [string, string]
}
