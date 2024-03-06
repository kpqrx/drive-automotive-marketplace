import type { Meta, StoryFn } from '@storybook/react'

import type { SidebarProps } from '@/components/molecules/Sidebar/Sidebar.types'
import { useState } from 'react'
import { Sidebar } from './Sidebar'

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
    <main className="min-h-screen">
      <button onClick={() => setState((prevState) => !prevState)}>
        Toggle sidebar
      </button>
      <Sidebar
        {...props}
        isOpen={state}
        setIsOpen={setState}
      />
    </main>
  )
}
