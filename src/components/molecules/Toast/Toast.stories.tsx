import type { Meta, StoryObj } from '@storybook/react'

import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'Molecules/Toast',
  component: Toast,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Toast>

export const Success: Story = {
  args: {
    status: 'success',
    title: 'Success',
    description: 'This is a success message.',
  },
}

export const Error: Story = {
  args: {
    status: 'error',
    title: 'Error',
    description: 'This is an error message.',
  },
}
