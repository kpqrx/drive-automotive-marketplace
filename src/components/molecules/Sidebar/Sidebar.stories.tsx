import type { Meta, StoryFn } from '@storybook/react'

import { Sidebar } from './Sidebar'
import { useState } from 'react'
import { HiOutlineFaceSmile } from 'react-icons/hi2'

const meta: Meta<typeof Sidebar> = {
  title: 'Molecules/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  args: {
    items: [
      { icon: HiOutlineFaceSmile, label: 'Sidebar item 1', href: '1' },
      { icon: HiOutlineFaceSmile, label: 'Sidebar item 2', href: '2' },
      { icon: HiOutlineFaceSmile, label: 'Sidebar item 3', href: '3' },
      { icon: HiOutlineFaceSmile, label: 'Sidebar item 4', href: '4' },
      { icon: HiOutlineFaceSmile, label: 'Sidebar item 5', href: '5' },
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
    <>
      {state && (
        <Sidebar
          {...props}
          stateSetter={setState}
        />
      )}
      <main>
        <button onClick={() => setState((prevState) => !prevState)}>
          Toggle sidebar
        </button>
      </main>
    </>
  )
}
