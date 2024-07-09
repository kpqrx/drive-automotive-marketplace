import type { Meta, StoryObj } from '@storybook/react'

import { UserActionPanel } from './UserActionPanel'

const meta: Meta<typeof UserActionPanel> = {
  title: 'Atoms/UserActionPanel',
  component: UserActionPanel,
  tags: ['autodocs'],
  args: {
    children: 'UserActionPanel',
  },
}

export default meta
type Story = StoryObj<typeof UserActionPanel>

export const Default: Story = {}
