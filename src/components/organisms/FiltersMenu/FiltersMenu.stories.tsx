import type { Meta, StoryFn } from '@storybook/react'

import { FiltersMenu } from './FiltersMenu'
import { useState } from 'react'
import type { FiltersMenuProps } from './FiltersMenu.types'

const meta: Meta<typeof FiltersMenu> = {
  title: 'Organisms/FiltersMenu',
  component: FiltersMenu,
  tags: ['autodocs'],
  args: {},
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const Default: StoryFn<typeof FiltersMenu> = (
  props: FiltersMenuProps,
) => {
  const [state, setState] = useState(false)
  return (
    <main className="min-h-screen">
      <button
        className="mb-4"
        onClick={() => setState((prevState) => !prevState)}
      >
        Toggle FiltersMenu
      </button>
      <FiltersMenu
        {...props}
        isOpen={state}
        setIsOpen={setState}
      />
    </main>
  )
}
