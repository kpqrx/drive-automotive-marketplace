import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    items: [
      {
        label: 'Tab 1',
        content: 'Lorem ipsum dolor sit amet 1',
      },
      {
        label: 'Tab 2',
        content: 'Lorem ipsum dolor sit amet 2',
      },
      {
        label: 'Tab 3',
        content: 'Lorem ipsum dolor sit amet 3',
      },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {}
