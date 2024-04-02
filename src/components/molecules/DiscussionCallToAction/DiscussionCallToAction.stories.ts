import type { Meta, StoryObj } from '@storybook/react'

import { DiscussionCallToAction } from './DiscussionCallToAction'

const meta: Meta<typeof DiscussionCallToAction> = {
  title: 'Molecules/DiscussionCallToAction',
  component: DiscussionCallToAction,
  tags: ['autodocs'],
  parameters: {
    background: {
      default: 'light',
    },
  },
}

export default meta
type Story = StoryObj<typeof DiscussionCallToAction>

export const Default: Story = {}
