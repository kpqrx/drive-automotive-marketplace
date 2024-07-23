import type { Meta, StoryObj } from '@storybook/react'

import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: {
    children: 'Skeleton',
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {}
