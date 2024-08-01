import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    children: 'Avatar',
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {}
