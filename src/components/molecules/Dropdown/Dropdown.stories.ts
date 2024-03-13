import type { Meta, StoryObj } from '@storybook/react'

import { Dropdown } from './Dropdown'

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    children: 'Trigger dropdown',
    items: [
      {
        label: 'First item',
        callback: () => console.log("You've clicked first item"),
      },
      {
        label: 'Second item',
        callback: () => console.log("You've clicked second item"),
      },
      {
        label: 'Third item',
        callback: () => console.log("You've clicked third item"),
      },
      {
        label: 'Fourth item',
        callback: () => console.log("You've clicked fourth item"),
      },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {}

export const EndAlignment: Story = {
  args: {
    align: 'end',
  },
}

export const CustomTrigger: Story = {
  args: {
    variant: 'secondary',
    size: 'small',
  },
}
