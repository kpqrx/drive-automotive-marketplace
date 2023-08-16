import type { Meta, StoryObj } from '@storybook/react'

import { Breadcrumbs } from './Breadcrumbs'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Atoms/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  args: {
    items: [
      { label: 'User profile', path: '#crumb-1' },
      { label: 'Settings', path: '#crumb-2' },
      { label: 'Security', path: '#crumb-3' },
      { label: 'Passwords and sessions', path: '#crumb-4' },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumbs>

export const Default: Story = {}

export const WithLastItemHighlighted: Story = {
  args: {
    isLastItemHighlighted: true,
  },
}
