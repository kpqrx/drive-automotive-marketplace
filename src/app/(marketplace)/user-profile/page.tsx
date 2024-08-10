'use client'
import { Avatar } from '@/components'
import { useUserStore } from '@/stores'
import { LiaCarSideSolid } from 'react-icons/lia'

export default function UserProfile() {
  const { firstName, lastName } = useUserStore()

  return (
    <div>
      <div className="mb-24 flex items-center gap-8">
        <Avatar
          className="!size-12"
          fullName={[firstName, lastName]}
        />
        <h1 className="text-5xl">Cześć, {firstName}</h1>
      </div>

      <div className="flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-600">
        <LiaCarSideSolid className="mb-6 size-20" />
        <h3 className="text-2xl font-medium">Wybierz stronę</h3>
      </div>
    </div>
  )
}
