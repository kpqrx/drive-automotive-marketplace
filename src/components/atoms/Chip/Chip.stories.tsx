import type { Meta, StoryObj } from '@storybook/react'

import { Chip } from './Chip'

const meta: Meta<typeof Chip> = {
  title: 'Atoms/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: {
    children: 'Chip',
  },
}

export default meta
type Story = StoryObj<typeof Chip>

export const Default: Story = {}
