import type { Meta, StoryFn } from '@storybook/react'

import { Sidebar } from './Sidebar'
import { useState } from 'react'
import { HiOutlineFaceSmile } from 'react-icons/hi2'
import { AnimatePresence } from 'framer-motion'

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

export const Default: StoryFn<typeof Sidebar> = (props) => {
  const [state, setState] = useState(false)
  return (
    <AnimatePresence>
      {state && (
        <Sidebar
          {...props}
          stateSetter={setState}
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
