import type { Meta, StoryObj } from '@storybook/react'

import { Tooltip } from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    children: <button>Hover me</button>,
    content: 'Hello, tooltip!',
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {}

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
}

export const CustomDelay: Story = {
  args: {
    delayDuration: 800,
  },
}
