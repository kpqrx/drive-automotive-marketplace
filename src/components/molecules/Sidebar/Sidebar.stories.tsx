import type { Meta, StoryFn } from '@storybook/react'

import { Sidebar } from './Sidebar'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { SidebarProps } from '@/components/molecules/Sidebar/Sidebar.types'

const meta: Meta<typeof Sidebar> = {
  title: 'Molecules/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  args: {
    items: [
      { label: 'Obserwowane oferty', href: '1' },
      { label: 'Obserwowane ogłoszenia', href: '2' },
    ],
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const Default: StoryFn<typeof Sidebar> = (props: SidebarProps) => {
  const [state, setState] = useState(false)
  return (
    <AnimatePresence>
      {state && (
        <Sidebar
          {...props}
          isOpen={state}
          setIsOpen={setState}
          // to fix storybook related error
          key={crypto.randomUUID()}
        />
      )}
      <main>
        <button onClick={() => setState((prevState) => !prevState)}>
          Toggle sidebar
        </button>
      </main>
    </AnimatePresence>
  )
}
