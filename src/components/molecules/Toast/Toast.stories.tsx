import type { Meta, StoryObj } from '@storybook/react'

import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'Molecules/Toast',
  component: Toast,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Toast>

export const Default: Story = {
  args: {
    children: 'Toast label',
  },
}
export const LengthyLabel: Story = {
  args: {
    children:
      "This label is very long and should wrap to the next line. Like, it should really wrap. Like, really really wrap, Cuz it's extremely long. Like, really long. Like, really really long. Like, really really really long. Like, really really really really long. Like, really really really really really long. Like, really really really really really really long. Like, really really really really really really really long. Like, really really really really really really really really long. Like, really really really really really really really really really long. 😮‍💨",
  },
}
