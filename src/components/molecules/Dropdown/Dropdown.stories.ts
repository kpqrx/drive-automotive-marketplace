import type { Meta, StoryObj } from '@storybook/react'

import { Dropdown } from './Dropdown'

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: {
    children: 'Click me',
    items: [
      {
        id: 1,
        label: 'First item',
        callback: () => alert("You've clicked first item"),
      },
      {
        id: 2,
        label: 'Secord item',
        callback: () => alert("You've clicked second item"),
      },
      {
        id: 3,
        label: 'Third item',
        callback: () => alert("You've clicked third item"),
      },
      {
        id: 4,
        label: 'Fourth item',
        callback: () => alert("You've clicked fourth item"),
      },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {}
export const LeftAnchorPoint: Story = {
  args: {
    anchorPoint: 'left',
  },
}
export const RightAnchorPoint: Story = {
  args: {
    anchorPoint: 'right',
  },
}
