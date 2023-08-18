import type { Meta, StoryFn } from '@storybook/react'

import { FiltersMenu } from './FiltersMenu'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
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
    <AnimatePresence>
      {state && (
        <FiltersMenu
          {...props}
          isOpen={state}
          setIsOpen={setState}
          // to fix storybook related error
          key={crypto.randomUUID()}
        />
      )}
      <main>
        <button onClick={() => setState((prevState) => !prevState)}>
          Toggle FiltersMenu
        </button>
      </main>
    </AnimatePresence>
  )
}
