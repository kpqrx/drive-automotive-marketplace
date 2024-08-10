import type { UserActionPanelProps } from '@/components/atoms/UserActionPanel/UserActionPanel.types'
import { signOut } from '@/lib'
import { useUserStore } from '@/stores'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  HiChevronDown as DropdownIcon,
  HiOutlineUser as UserIcon,
} from 'react-icons/hi2'
import styles from './UserActionPanel.module.css'

export const UserActionPanel = (props: UserActionPanelProps) => {
  const { children, size = 'lg', className = '', ...restProps } = props
  const { firstName, userId, removeUser } = useUserStore()
  const { replace } = useRouter()

  const isUserLoggedIn = Boolean(userId)

  const handleSignOut = async () => {
    const isSignedOut = await signOut()

    if (isSignedOut) {
      removeUser()
      replace('/')
    }
  }

  if (isUserLoggedIn) {
    return (
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger className={clsx(className, styles.container)}>
          <UserIcon className={styles.userIcon} />
          <span className={styles.welcomeMessage}>Cześć, {firstName}</span>
          <DropdownIcon className={styles.icon} />
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Content align="end">
          <PopoverPrimitive.Arrow className={styles.dropdownArrow} />
          <ul className={styles.dropdown}>
            <li>
              <Link
                href="/user-profile"
                className={styles.dropdownItem}
              >
                Profil użytkownika
              </Link>
            </li>
            <li>
              <button
                className={styles.dropdownItem}
                onClick={handleSignOut}
              >
                Wyloguj się
              </button>
            </li>
          </ul>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    )
  }

  return (
    <div
      className={clsx(className, styles.container)}
      {...restProps}
    >
      <Link
        href="/sign-in"
        className={styles.link}
      >
        Zaloguj się
      </Link>
      &nbsp;lub&nbsp;
      <Link
        href="/sign-up"
        className={styles.link}
      >
        Zarejestuj się
      </Link>
    </div>
  )
}
